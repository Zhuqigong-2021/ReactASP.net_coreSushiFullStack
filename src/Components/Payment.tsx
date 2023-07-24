import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment/PaymentForm";
import OrderSummary from "./Order/OrderSummary";

const Payment = () => {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51MLbgqFbO75adVTE6enjQeafPyVoqgfA0PzMWIReetwpC7dCr7kr0FDRSSaEcdDNZKxDKp0MrzF20EUv1bZqgU8d00bvcvh4Es"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };
  return (
    <div className="bg-gray-50 h-full p-0 lg:p-6 md:p-6 w-full">
      <Elements stripe={stripePromise} options={options}>
        <div className=" m-5 p-0 md:p-5 lg:p-5">
          <div className="flex flex-col space-x-6s md:flex-row lg:flex-row">
            <div className="flex flex-col w-full">
              <OrderSummary data={apiResult} userInput={userInput} />
            </div>
            <div className="w-full md:w-[480px] lg:w-[480px] flex flex-col px-4 items-end mt-4 lg:mt-0 md:mt-0">
              <h3 className="text-indigo-500 font-extrabold text-left w-full">
                Payment
              </h3>
              <div className="mt-5 w-full">
                <PaymentForm data={apiResult} userInput={userInput} />
              </div>
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
