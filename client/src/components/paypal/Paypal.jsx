import React, { useRef, useEffect, useState, useMemo } from "react";

function Paypal({ showPaypal }) {
  const paypal = useRef();

  useEffect(() => {
    console.log("daz");
    if (showPaypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "USD",
                    value: 650.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }
  }, [showPaypal]);

  return useMemo(() => (
    <div>
      {showPaypal && <div ref={paypal}>azda</div>}
    </div>
  ), [showPaypal]);
}

export default React.memo(Paypal);
