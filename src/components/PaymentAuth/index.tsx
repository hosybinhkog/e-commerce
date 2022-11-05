import { useAppDispatch, useAppSelector } from "@/hooks";
import PrivateRoute from "@/layouts/auth/PrivateRoute";
import LayoutMain from "@/layouts/commom/LayoutMain";
import { clearErrors, createOrder } from "@/redux/actions/order.actions";
import Currency from "react-currency-formatter";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const PaymentAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const router = useRouter();

  const { shippingInfo, cartItems } = useAppSelector((state) => state.cart);

  const { user } = useAppSelector((state) => state.user);
  const { error } = useAppSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handleSubmitFormPayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:5555/api/v1/payment/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result?.error.message.toString());
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // @ts-ignore
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // @ts-ignore
          dispatch(createOrder(order));
          router.push("/payment/success");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      // @ts-ignore
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <PrivateRoute>
      <Head>
        <title>Payment - amazone</title>
      </Head>
      <LayoutMain>
        <div className='my-5 mx-5'>
          <h1 className='text-3xl font-extrabold text-gray-700 mb-4'>
            Payments Info
          </h1>
          <h3 className='pl-4 border-4 border-l-gray-400 text-xl font-semibold text-gray-600 '>
            Infomation
          </h3>
          <p className='text-base text-gray-400 mb-2'>
            Amazone - hosybinhkog - hutech
          </p>
          <form
            onSubmit={handleSubmitFormPayment}
            className='bg-white p-5 rounded-md'
          >
            <div className='flex flex-col gap-2 mb-2'>
              <label className='text-base mb-1 font-semibold'>
                Credit Card
              </label>
              <CardNumberElement />
            </div>
            <div className='flex flex-col gap-2 mb-2'>
              <label className='text-base mb-1 font-semibold'>CardExpiry</label>
              <CardExpiryElement />
            </div>
            <div className='flex flex-col gap-2 mb-2'>
              <label className='text-base mb-1 font-semibold'>Card cvc</label>
              <CardCvcElement />
            </div>
            <button
              type='submit'
              ref={payBtn}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2'
            >
              Pay -{" "}
              {orderInfo && (
                <Currency quantity={orderInfo.totalPrice || 0} currency='GBP' />
              )}
            </button>
          </form>
        </div>
      </LayoutMain>
    </PrivateRoute>
  );
};

export default PaymentAuth;
