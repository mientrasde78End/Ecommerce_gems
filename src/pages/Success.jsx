import { useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();

  return (
    <div>
      <h1>✅ Pago exitoso</h1>
      <p>Estado: {params.get("redirect_status")}</p>
      <p>PaymentIntent: {params.get("payment_intent")}</p>
    </div>
  );
}
