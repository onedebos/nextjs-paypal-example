import { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {useRouter} from 'next/router'

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const [paypalErrorMessage, setPaypalErrorMessage] = useState('')
  const [paypalLoading, setPaypalLoading] = useState('')
  const [orderID, setOrderID] = useState(false);
  const router = useRouter();


  // handles payments for paypal
  const createOrder = (data, actions) => {
    logEvent('Payments', 'Attempted to pay with Paypal');
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: PAYPAL.AMT,
            },
          },
        ],

        application_context:{
          shipping_preference: 'NO_SHIPPING'
        }
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // handles when a payment is confirmed for paypal
  const onApprove = (data, actions) => {
    setPaypalLoading(true)
    return actions.order.capture().then(function (details) {
      const {
        name: { given_name },
        email_address,
      } = details.payer;
      // console.log({ given_name, email_address });
      const data = {name: given_name, email: email_address}
      // const data = { name: given_name, email: "onedebos@gmail.com" };

      axios
        .post(HANDLE_PAYPAL_PAYMENT_API, data)
        .then(() =>{
          setPaypalLoading(false)
          saveEmailToLocalStorage(email_address);
          setSucceeded(true)
        } )
        .catch((err) =>{
          setPaypalLoading(false);
          setPaypalErrorMessage("Something went wrong while processing your payment.")
        } );
    });
  };

  
    
  return (
    <form
      id="payment-form"
      className="flex flex-col m-auto xl:m-0 xl:h-full xl:py-10 h-screen justify-center mx-5 lg:mx-20"
    >
      <h1 className="text-gray-800 font-medium mb-5">Pay by card with Paypal</h1>
      <div className="max-w-md">

      <h1 className="mt-10 mb-2 text-gray-800 font-medium">or with PayPal</h1>
      <div className="mt-1 max-w-md pb-20">
        <PayPalButtons
          style={{
            color: "blue",
            shape: "pill",
            label: "pay",
            tagline: false,
            layout: "horizontal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
        {paypalErrorMessage && <p className="text-red-600">{paypalErrorMessage}</p>}
        {paypalLoading && <p className="text-green-500 text-center font-semibold">Hold on a sec, We're completing your purchase</p>}
      </div>

      <div className="mt-3 text-center">
          contact <span className="font-semibold">info@mylibrafriends.com</span> for support.
      </div>
      </div>
    </form>


  );
};

export default CheckoutForm;