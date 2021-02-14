import { useState, useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {useRouter} from 'next/router'

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
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

    });
  };

  
    
  return (
    <main className="flex flex-col items-center justify-center bg-red-200 flex-1 px-20 text-center">
    <h1 className="text-6xl font-bold">
      Payments with {" "}
      <a className="text-blue-600" href="https://paypal.com">
        Paypal!
      </a>
    </h1>
      <h1 className="text-gray-800 font-medium mb-5">Pay by card with Paypal</h1>
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
    </main>


  );
};

export default CheckoutForm;