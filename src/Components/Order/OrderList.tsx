import { useNavigate } from "react-router-dom";
import MainSpinner from "../../Common/MainSpinner";
import orderHeaderModel from "../../interfaces/orderHeaderModel";
import OrderListProps from "./orderListType";
import { getStatusColor } from "../../Helper";

const OrderList = ({ isLoading, orderData }: OrderListProps) => {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && (
        <div className=" flex-1 w-full flex justify-center items-center">
          <MainSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col py-6 pt-16  px-20  mx-5 mt-5 bg-gray-50  min-w-[1000px] ">
          <div className="flex flex-col  w-full ">
            <div className="grid grid-cols-8  mb-4 px-4 py-4 text-white items-center justify-between w-full  bg-indigo-500 ">
              <div className="flex items-center text-left text-lg">ID</div>
              <div className="flex items-center text-left text-lg">Name</div>
              <div className="flex items-center text-left text-lg">Phone</div>
              <div className="flex items-center text-left text-lg">Total</div>
              <div className="flex items-center text-left text-lg">Items</div>
              <div className="flex items-center text-left text-lg">Date</div>
              <div className="flex items-center text-left text-lg">Status</div>
              <div className="flex items-center "></div>
            </div>
            {orderData.map((orderItem: orderHeaderModel, index: number) => {
              const badgeTypeColor = getStatusColor(orderItem.status!);

              return (
                <div
                  className="grid grid-cols-8  mb-4 px-4 py-2  items-center justify-between w-full border border-b-2"
                  key={index}
                >
                  <div className="flex items-center ">
                    {orderItem.orderHeaderId}
                  </div>
                  <div className="flex items-center">
                    {orderItem.pickupName}
                  </div>
                  <div className="flex items-center">
                    {orderItem.pickupPhoneNumber}
                  </div>
                  <div className="flex items-center">
                    {(orderItem.orderTotal! * 1.15).toFixed(2)}
                  </div>
                  <div className="flex items-center">
                    {orderItem.totalItems}
                  </div>
                  <div>
                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                  </div>
                  <div>
                    <span
                      className={`${"text-" + badgeTypeColor} p-1 rounded-sm `}
                    >
                      {orderItem.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() =>
                        navigate(
                          "/order/orderDetails/" + orderItem.orderHeaderId
                        )
                      }
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
