import { useEffect, useState } from "react";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import api from "../services/api";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success",
      },
    });

    if (error) setError(error.message);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <PaymentElement />
      <button disabled={!stripe || loading} style={{ marginTop: 20 }}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createIntent() {
      try {
        const res = await api.post(
          "ecommerce/payments/create-payment-intent/",
          { amount: 1000 },
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error(err);
        setError("Error creando el pago");
      }
    }

    createIntent();
  }, []);

  if (error) return <p>{error}</p>;
  if (!clientSecret) return <p>Cargando pago...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
