import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlan } from '@/redux/action/pricingAction';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Loader } from '@/components/ui/loader';
import PaymentForm from './components/PaymentForm';
import './design.css';
import { Check, CircleCheck, CircleX, X } from 'lucide-react';

const Subscription = () => {
  const dispatch = useDispatch<any>();
  const { allPlans, loading } = useSelector((state: any) => state.plan);
  const { user } = useSelector((state: any) => state.auth);
  const plansContainerRef = useRef<HTMLDivElement | null>(null);
  const [editSubscription, setEditSubscription] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleTogglePricing = (checked: boolean) => {
    setIsYearly(checked);
  };

  useEffect(() => {
    dispatch(getAllPlan('', 1, 10)).then((response: any) => {
      if (response.success) {
        dispatch(getAllPlan('', 1, response.total));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (plansContainerRef.current) {
        // Check if the event is within the plans container
        if (plansContainerRef.current.contains(event.target as Node)) {
          event.preventDefault();

          // Calculate the scroll distance dynamically
          const scrollAmount =
            event.deltaY < 0
              ? -plansContainerRef.current.offsetWidth / 3
              : plansContainerRef.current.offsetWidth / 3;

          // Scroll horizontally by the calculated amount
          plansContainerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Optional for smooth scrolling
          });
        }
      }
    };
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handleCloseModal = () => setEditSubscription(false);

  const savePaymentDetails = async (details: any) => {
    try {
      const response = await axios.post('/api/payment-details', details);
      console.log('Response of save payment:', response);
    } catch (error) {
      console.error('Error saving payment details:', error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {loading ? (
        <Loader />
      ) : (
        // <div className="mx-auto w-full max-w-7xl ">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className=" rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 shadow-lg ">
            <h2 className="mb-8 mt-6 text-center text-4xl font-bold text-gray-800">
              Our Plan
            </h2>
            <p className="mb-6 text-center text-gray-600">
              All plans include 40+ advanced tools and features to boost your
              product. Choose the best plan to fit your needs.
            </p>

            {/* Toggle between Monthly and Yearly */}
            <div className="mb-10 flex items-center justify-center space-x-4">
              <span className="text-lg text-gray-700">Monthly</span>
              <Switch
                checked={isYearly}
                onCheckedChange={handleTogglePricing}
                style={{
                  backgroundColor: isYearly ? '#7266ED' : '#ccc', // Color when checked
                  transition: 'background-color 0.3s'
                }}
              />

              <span className="text-lg text-gray-700">Annually</span>
            </div>

            {/* Plan Cards */}
            <div
              className="plans-container mb-4 flex gap-6 overflow-x-auto p-4  pl-[0.5rem] pr-[0.5rem]"
              ref={plansContainerRef}
            >
              {allPlans?.plans?.length > 0 ? (
                allPlans.plans.map((plan: any) => (
                  <Card
                    key={plan._id}
                    className={` min-w-[400px] max-w-[500px] transform rounded-xl border border-gray-200  p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${
                      user?.plan?.planId?._id === plan._id
                        ? 'bg-[rgb(117,105,244)] text-white '
                        : ''
                    }`}
                  >
                    <CardHeader
                      className={`p-6  ${
                        user?.plan?.planId?._id === plan._id
                          ? ' text-white'
                          : ''
                      }`}
                    >
                      <div className="mb-6 text-center">
                        {plan.image?.url ? (
                          <img
                            src={plan.image.url}
                            alt={`${plan.planName} logo`}
                            className="mx-auto h-20 object-contain"
                          />
                        ) : (
                          <div
                            className={`flex items-center justify-center text-xl font-semibold ${
                              user?.plan?.planId?._id === plan._id
                                ? 'text-white'
                                : 'text-primary'
                            } mx-auto h-24 w-24 rounded-full bg-gray-200`}
                          >
                            {isYearly
                              ? `$${plan.yearlyPrice}`
                              : `$${plan.price}`}
                          </div>
                        )}
                      </div>
                      <h3
                        className={`text-center text-xl font-semibold  ${
                          user?.plan?.planId?._id === plan._id
                            ? ' text-white'
                            : 'text-gray-800'
                        } `}
                      >
                        {plan.planName}
                      </h3>
                      <h5
                        className={`text-center text-lg font-semibold ${
                          user?.plan?.planId?._id === plan._id
                            ? 'text-white'
                            : 'text-[#7266ED]'
                        }`}
                      >
                        {plan.planName === 'Basic' ? (
                          <span className="flex items-center justify-center">
                            <span className="mr-2 text-gray-500 line-through">
                              {isYearly
                                ? `$${plan.yearlyPrice}/year`
                                : `$${plan.price}/month`}
                            </span>
                            <span className="font-bold text-[#7266ED]">
                              Free
                            </span>
                          </span>
                        ) : isYearly ? (
                          `$${plan.yearlyPrice}/year`
                        ) : (
                          `$${plan.price}/month`
                        )}
                      </h5>
                    </CardHeader>

                    <CardContent className="space-y-3 p-6">
                      <ul
                        className={`list-disc space-y-2 pl-5 ${
                          user?.plan?.planId?._id === plan._id
                            ? ' text-white'
                            : 'text-gray-700'
                        } `}
                      >
                        <li className="flex items-center gap-2">
                          <Check size={20} className="text-green-500" />

                          {plan.isTabInfinite
                            ? 'Unlimited Tabs'
                            : `${plan.tabsLimit} Tabs`}
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={20} className="text-green-500" />

                          {plan.isNotesInfinite
                            ? 'Unlimited Notes'
                            : `${plan.notesLimit} Notes`}
                        </li>
                        <li className="flex items-center gap-2">
                          {plan.defaultColor ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <X size={20} className="text-red-500" />
                          )}
                          {plan.defaultColor
                            ? 'Default Color Included'
                            : 'No Default Color'}
                        </li>
                        <li className="flex items-center gap-2">
                          {plan.customization ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <X size={20} className="text-red-500" />
                          )}
                          {plan.customization
                            ? 'Full Customization'
                            : 'Limited Customization'}
                        </li>
                        <li className="flex items-center gap-2">
                          {plan.prioritySupport ? (
                            <Check size={20} className="text-green-500" />
                          ) : (
                            <X size={20} className="text-red-500" />
                          )}
                          {plan.prioritySupport
                            ? 'Priority Support'
                            : 'Standard Support'}
                        </li>
                      </ul>
                    </CardContent>

                    <CardFooter className="mt-6 flex justify-center">
                      <Button
                        variant={
                          user?.plan?.planId?._id === plan._id
                            ? 'outline'
                            : 'default'
                        }
                        className={`rounded-lg border px-6 py-3 font-semibold shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          user?.plan?.planId?._id === plan._id
                            ? 'cursor-not-allowed border-[#FAC23D] bg-[#FAC23D] text-black hover:border-[#FAC23D] hover:bg-[#FAC23D] hover:text-black focus:ring-[#FAC23D]'
                            : 'border-[#7266ED] bg-[#7266ED] text-white hover:border-[#7266ED] hover:bg-white hover:text-[#7266ED] focus:ring-[#7266ED] '
                        }`}
                        onClick={() => {
                          if (user?.plan?.planId?._id !== plan._id) {
                            setSelectedPlan(plan);
                            setEditSubscription(true);
                          }
                        }}
                        // disabled={user?.plan?.planId?._id === plan._id}
                      >
                        {user?.plan?.planId?._id === plan._id
                          ? 'Your Current Plan'
                          : 'Subscribe Now'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">
                  No plans available at the moment.
                </p>
              )}
            </div>

            {/* Payment Modal */}
            {selectedPlan && (
              <Dialog open={editSubscription} onOpenChange={handleCloseModal}>
                <DialogContent className="w-[800px] max-w-[100%] rounded-lg bg-white p-6 shadow-xl">
                  <DialogTitle className="text-2xl font-semibold text-gray-800">
                    Subscribe to {selectedPlan?.planName}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-gray-600">
                    <PaymentForm
                      selectedPlan={selectedPlan?.planName}
                      handleCloseModal={handleCloseModal}
                      savePaymentDetails={savePaymentDetails}
                      amount={
                        isYearly
                          ? selectedPlan?.yearlyPrice
                          : selectedPlan?.price
                      }
                      price={
                        isYearly
                          ? selectedPlan?.yearlyPrice
                          : selectedPlan?.price
                      }
                      productId={selectedPlan?._id}
                      isYearly={isYearly}
                    />
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
