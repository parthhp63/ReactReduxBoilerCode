import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { getUserAsync } from '@/redux/action/authAction';
import { getAllPlan } from '@/redux/action/pricingAction';
import { Button } from '@/components/ui/button'; // Assuming Button is from Shadcn UI
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Assuming Card components are from Shadcn UI

const createOptions = (fontSize: any, padding: any) => ({
  style: {
    base: {
      fontSize,
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': {
        color: '#aab7c4'
      },
      padding
    },
    invalid: {
      color: '#9e2146'
    }
  }
});

interface PaymentFormProps {
  selectedPlan: any;
  handleCloseModal: any;
  savePaymentDetails: any;
  monthlyPrice: any;
  yearlyPrice: any;
  productId: any;
  amount: any;
}

const Subscription: React.FC<PaymentFormProps> = ({
  selectedPlan,
  handleCloseModal,
  yearlyPrice,
  monthlyPrice,
  savePaymentDetails,
  productId,
  amount
}) => {
  const dispatch = useDispatch<any>();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('18px');
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const updateFontSize = () =>
      setFontSize(window.innerWidth < 450 ? '14px' : '18px');

    window.addEventListener('resize', updateFontSize);
    updateFontSize();

    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setShowLoader(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      if (!cardNumberElement) {
        toast.error('Card information is incomplete.');
        setLoading(false);
        setShowLoader(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement
      });

      if (error) {
        console.error(error.message);
        toast.error(error.message);
        setLoading(false);
        setShowLoader(false);
        return;
      }

      const API_URL = import.meta.env.VITE_APP_API_URL;
      const subscriptionResponse = await fetch(`${API_URL}/upgrade/plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: (isYearly ? yearlyPrice : monthlyPrice) * 100,
          planId: productId,
          planPurchaseType: isYearly ? 'year' : 'month',
          paymentMethodId: paymentMethod?.id
        }),
        credentials: 'include'
      });

      if (!subscriptionResponse.ok) {
        const errorText = await subscriptionResponse.text();
        console.error('Server error:', errorText);
        toast.error('Failed to create a subscription. Please try again.');
        setLoading(false);
        setShowLoader(false);
        return;
      } else {
        toast.success('Payment successful!');
        handleCloseModal();
        dispatch(getUserAsync());
        dispatch(getAllPlan('', 1, 10)).then((response: any) => {
          if (response.success === true) {
            dispatch(getAllPlan('', 1, response?.total));
          }
        });
      }
    } catch (error) {
      console.error('Error during payment submission:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };

  return (
    <div className="payment-container">
      {showLoader && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <div className="flex gap-6">
        {/* Left Column: Plan Info */}
        <div className="w-full sm:w-1/2">
          <Card className="rounded-lg bg-white p-4 shadow-lg">
            <CardHeader>Selected Plan Info</CardHeader>
            <hr className="my-2" />
            <CardContent>
              <h6 className="text-sm text-gray-600">
                Choose a plan that best suits your business needs.
              </h6>
              <div className="bg-light my-4 rounded-lg border p-4">
                <h6 className="text-lg font-semibold">
                  Selected Plan: {selectedPlan}
                </h6>
                <div className="my-4 text-center">
                  <h3 className="text-xl font-bold">${amount}</h3>
                  {/* <div className="flex justify-center gap-4">
                    <Button
                      variant={isYearly ? 'outline' : 'default'}
                      onClick={() => setIsYearly(false)}
                      style={{ backgroundColor: '#7266ED', color: 'white' }}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={isYearly ? 'default' : 'outline'}
                      onClick={() => setIsYearly(true)}
                      style={{ backgroundColor: '#7266ED', color: 'white' }}
                    >
                      Yearly
                    </Button>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Payment Form */}
        <div className="w-full sm:w-1/2">
          <Card className="rounded-lg bg-white p-4 shadow-lg">
            <CardHeader title="Credit Card Info" />
            <hr className="my-2" />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label className="block">
                    Card Number
                    <CardNumberElement
                      options={createOptions(fontSize, '10px')}
                    />
                  </label>
                  <label className="block">
                    Expiration Date
                    <CardExpiryElement
                      options={createOptions(fontSize, '10px')}
                    />
                  </label>
                  <label className="block">
                    CVC
                    <CardCvcElement options={createOptions(fontSize, '10px')} />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-5">
                  <Button variant="outline" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={!stripe || loading}
                    style={{ backgroundColor: '#7266ED', color: 'white' }}
                  >
                    {loading ? <div className="spinner"></div> : 'Pay Now'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const stripePromise = loadStripe(
  'pk_test_51PKz5bIblm0ueTqhEj1r3Vx3VAME0dDqqbfsiXswlZBDNHJqBLFQZ7LrGeSdbUtbuc1WUMBUixZqMPfwnzrd94Cv00bC7yMV91'
);

const PaymentPage = (props: any) => (
  <Elements stripe={stripePromise}>
    <Subscription {...props} />
  </Elements>
);

export default PaymentPage;
