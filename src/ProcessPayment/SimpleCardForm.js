import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';

const SimpleCardForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [ errorPayment, setErrorPayment ] = useState(null)
    const [ succesPayment, setSuccessPayment ] = useState(null)
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }

     const cardElement = elements.getElement(CardElement);
     const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
          setErrorPayment(error.message)
          setSuccessPayment(null)
        console.log('[error]', error);
      } else {
          setSuccessPayment(paymentMethod.id)
          setErrorPayment(null)
          handlePayment(paymentMethod.id)
        console.log('[PaymentMethod]', paymentMethod);
      }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                Pay
                </button>
            </form>
            {
                errorPayment  && <div  style={{color:'red'}}> {errorPayment}</div>
            }
            {
                succesPayment && <div style ={{color:'green'}} >  Payment success!!</div>
            }
        </div>
    );
};

export default SimpleCardForm;