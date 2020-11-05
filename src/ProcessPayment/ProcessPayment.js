import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51HeQ82EOmJUxDUHIIiOyQST2cn1DHe8IAl1lWAGnmCs0B3uZP8Kv1oseZNRQkrSxDZnIGNHCUTtRqifIRtqTvWTu00dGSOlbTT');

const ProcessPayment = ({handlePayment}) => {
    return (
      <Elements stripe={stripePromise}>
          <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>

      </Elements>
    );
};

export default ProcessPayment;