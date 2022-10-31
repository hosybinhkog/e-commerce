import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LayoutMain from "@/layouts/commom/LayoutMain";
import axios from "axios";
import { Loading } from "@/components";
import PrivateRoute from "@/layouts/auth/PrivateRoute";

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
    console.log(data);

    setStripeApiKey(data.stripeApiKey);
  }

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  console.log(orderInfo);

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <>
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <PrivateRoute>
            <LayoutMain>
              <div></div>
            </LayoutMain>
          </PrivateRoute>
        </Elements>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Payment;
