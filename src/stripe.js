import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51T2KOKD9zkqPmCihu1MbZpO8AL1DN9Uvjn8pPWjHfokJQgGnfwCIOz8S43WQkg1TIzapMKgTupjTtspzIwGCkLhc00CvGWAVcA",
);
