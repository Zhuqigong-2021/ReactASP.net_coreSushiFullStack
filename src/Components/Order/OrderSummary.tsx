import { getStatusColor } from "../../Helper";
import { cartItemModel } from "../../interfaces";

import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../Utility/SD";
import { RootState } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import MainSpinner from "../../Common/MainSpinner";
import { orderSummaryProps } from "./orderSummaryProps";
import { useUpdateOrderHeaderMutation } from "../../Apis/orderApi";
// import { orderSummaryProps } from "../Components/Order/OrderSummaryProps";
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
function OrderSummary({ data, userInput }: orderSummaryProps) {
  const badgeTypeColor = getStatusColor(data.status!);
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [loading, setIsLoading] = useState(false);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { color: "bg-cyan-400", value: SD_Status.BEING_COOKED }
      : data.status! === SD_Status.BEING_COOKED
      ? { color: "bg-amber-400", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && {
          color: "bg-green-500",
          value: SD_Status.COMPLETED,
        };

  const handleNextStatus = async () => {
    setIsLoading(true);

    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });

    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setIsLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="bg-gray-50 flex justify-center items-center flex-1">
          <MainSpinner />
        </div>
      )}
      {!loading && (
        <div className=" px-4 ">
          <div className="flex  text-3xl justify-between items-center ">
            <h3 className="text-indigo-500 font-extrabold">Order Summary</h3>
            <span
              className={`text-base p-2 rounded-lg text-white ${"bg-" +
                badgeTypeColor}`}
            >
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">
              <span className="font-bold">Name : </span>
              {userInput.name}
            </div>
            <div className="border py-3 px-2">
              <span className="font-bold">Email : </span>
              {userInput.email}
            </div>
            <div className="border py-3 px-2">
              <span className="font-bold">Phone : </span>
              {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2 flex flex-col ">
              <h4 className="text-indigo-500 font-extrabold mb-4 ">
                Menu Items
              </h4>
              <div className="p-3 space-y-3">
                {data.cartItems?.map(
                  (cartItem: cartItemModel, index: number) => {
                    return (
                      <div className="flex " key={index}>
                        <div className="flex justify-between items-center w-full">
                          <p>{cartItem.menuItem?.name}</p>
                          <p>
                            ${cartItem.menuItem?.price} x {cartItem.quantity} =
                          </p>
                        </div>
                        <p>
                          $
                          {(cartItem.menuItem?.price ?? 0) *
                            (cartItem.quantity ?? 0)}
                        </p>
                      </div>
                    );
                  }
                )}

                <hr />
                <h4 className="text-red-500 text-right font-extrabold text-2xl">
                  {data.cartTotal && (
                    <span className="font-extrabold">
                      ${(Number(data.cartTotal) * 1.15).toFixed(2)}
                    </span>
                  )}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <button
              className="bg-indigo-500 text-white p-2 rounded-lg"
              onClick={() => navigate(-1)}
            >
              Back to Orders
            </button>
            {userData.role == SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCELLED &&
                  data.status! !== SD_Status.COMPLETED && (
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                <button
                  className={`${nextStatus.color} p-2 rounded-lg `}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
