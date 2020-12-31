import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HJmy2CVL1PSmkiXoRjqMkJzs7sC5r8r82uwZcHnCOhNq3Y0NPtSfoUAOxY8kMh4YU46Xg8p86FKlUiPHQHlceuc00965hO900';

    const onToken = token => {
        alert('Payment');
        console.log(token);
    };
    return (
        <StripeCheckout
            label='Pay Now'
            name='Fashionet'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}    
        ></StripeCheckout>
    );
};

export default StripeCheckoutButton;