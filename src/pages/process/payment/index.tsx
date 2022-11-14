import { Loading, PaymentAuth } from "@/components";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Payment: NextPage = () => {
  const [stripeApiKey, setStripeApiKey] = useState<string>("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:5555/api/v1/payment/stripapikey",
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        withCredentials: true,
      }
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  }, []);

  return (
    <>
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <PaymentAuth />
        </Elements>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Payment;
