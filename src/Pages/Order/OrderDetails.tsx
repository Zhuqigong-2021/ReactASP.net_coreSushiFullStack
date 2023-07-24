import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../Apis/orderApi";
import OrderSummary from "../../Components/Order/OrderSummary";

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  let userInput, orderDetails;
  if (!isLoading && data.result) {
    console.log(data.result);
    userInput = {
      name: data.result[0].pickupName,
      email: data.result[0].pickupEmail,
      phoneNumber: data.result[0].pickupPhoneNumber,
    };
    orderDetails = {
      id: data.result[0].orderHeaderId,
      cartItems: data.result[0].orderDetails,
      cartTotal: data.result[0].orderTotal,

      status: data.result[0].status,
    };
  }
  return (
    <div className="flex justify-center flex-1 items-center bg-gray-100  px-6 py-10 ">
      {!isLoading && orderDetails && userInput && (
        <div className="w-full">
          <OrderSummary data={orderDetails} userInput={userInput} />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
