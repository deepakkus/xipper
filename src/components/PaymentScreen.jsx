// import React from 'react';
// import { Button } from 'react-native';
// import CashfreePayment from 'cashfree-react-native-sdk'; // Import Cashfree SDK

// const PaymentScreen = () => {
//   const initiatePayment = () => {
//     CashfreePayment.initiatePayment({
//       amount: 100,
//       orderId: 'order-id',
//       customerName: 'John Doe',
//       customerEmail: 'john@example.com',
//       customerPhone: '1234567890',
//       callbackUrl: 'https://your-callback-url.com',
//       // Add other necessary parameters
//     });
//   };

//   return (
//     <Button title="Pay Now" onPress={initiatePayment} />
//   );
// };

// export default PaymentScreen;




import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import CashfreePG from 'react-native-cashfree-pg-sdk';

const PaymentScreen = () => {
  useEffect(() => {
    CashfreePG.onPaymentSuccess = (response) => {
      console.log('Payment successful', response);
    };

    CashfreePG.onPaymentFailure = (error) => {
      console.log('Payment failed', error);
    };

    return () => {
      CashfreePG.onPaymentSuccess = null;
      CashfreePG.onPaymentFailure = null;
    };
  }, []);

  const initiatePayment = () => {
    const paymentData = {
      orderId: 'order-id-12345',
      orderAmount: 100.0,
      customerEmail: 'customer@example.com',
      customerPhone: '9876543210',
      returnUrl: 'https://your-redirect-url.com/callback',
      notifyUrl: 'https://your-notify-url.com/notify',
      clientId: '716320fbcd7ac0285ac623b5ac023617',
      clientSecret: 'cfsk_ma_prod_08cf92bc5e696c8727af4effee045e0a_7fd66b58',
    };

    CashfreePG.initPayment(paymentData)
      .then(response => {
        console.log('Payment initiation response', response);
      })
      .catch(error => {
        console.log('Payment initiation failed', error);
      });
  };

  return (
    <View>
      <Text>Cashfree Payment Gateway</Text>
      <Button title="Initiate Payment" onPress={initiatePayment} />
    </View>
  );
};

export default PaymentScreen;
