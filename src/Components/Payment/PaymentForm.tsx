import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
// import { useCreateOrderMutation } from "../../../Apis/orderApi";

import { toastNotify } from "../../Helper";

import { apiResponse, cartItemModel, userModel } from "../../interfaces";
import { SD_Status } from "../../Utility/SD";
import { useNavigate } from "react-router";
// import { orderSummaryProps } from "../Order/OrderSummaryProps";
import { useCreateOrderMutation } from "../../Apis/orderApi";
import { orderSummaryProps } from "../Order/orderSummaryProps";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../Storage/Redux/shoppingCartSlice";
import { setPaymentStatus } from "../../Storage/Redux/paymentStatusSlice";
import { useClearShoppingCartMutation } from "../../Apis/shoppingCartApi";
import { RootState } from "../../Storage/Redux/store";
// import { orderSummaryProps } from "../Order/orderSummaryProps";
// export interface orderSummaryProps {
//   data: {
//     id?: number;
//     cartItems?: shoppingCartModel[];
//     cartTotal?: number;
//     userId?: string;
//     stripePaymentIntentId?: string;
//     status?: SD_Status;
//   };
//   userInput: {
//     name: string;
//     email: string;
//     phoneNumber: string;
//   };
// }
const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const [clearShoppingCart] = useClearShoppingCartMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occured.", "error");
      setIsProcessing(false);
    } else {
      dispatch(setPaymentStatus(true));
      let grandTotal = 0;
      let totalItems = 0;
      const orderDetailsDTO: any = [];
      data.cartItems?.forEach((item: cartItemModel) => {
        const tempOrderDetail: any = {};
        tempOrderDetail["menuItemId"] = item.menuItem?.id;
        tempOrderDetail["quantity"] = item.quantity;
        tempOrderDetail["itemName"] = item.menuItem?.name;
        tempOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(tempOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal * 1.15,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });

      if (response) {
        if (response.data?.result.status === SD_Status.CONFIRMED) {
          dispatch(emptyCart());
          clearShoppingCart({ userId: userData.id });
          navigate(
            `/order/orderConfirmed/${response.data.result.orderHeaderId}`
          );
        } else {
          navigate("/failed");
        }
      }
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full ">
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="btn bg-indigo-500  text-white py-4 mt-5 w-full rounded-lg"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
