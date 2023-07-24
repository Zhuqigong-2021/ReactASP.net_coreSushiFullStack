import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";

import MainSpinner from "../../Common/MainSpinner";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";

import OrderList from "../../Components/Order/OrderList";

import { useEffect, useState } from "react";
import orderHeaderModel from "../../interfaces/orderHeaderModel";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);

  const { data, isLoading } = useGetAllOrdersQuery({ userId });
  const [userData, setUserData] = useState([]);
  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );
  useEffect(() => {
    if (data) {
      setUserData(data.apiResponse.result);
    }
  }, [data]);
  useEffect(() => {
    if (searchValue && data) {
      setUserData(
        data?.apiResponse?.result.filter(
          (u: orderHeaderModel) =>
            u.pickupEmail?.includes(searchValue) ||
            u.pickupName?.includes(searchValue) ||
            u.pickupPhoneNumber?.includes(searchValue)
        )
      );
    }
    if (data && !searchValue) {
      setUserData(data?.apiResponse.result);
    }
  }, [searchValue]);

  return (
    <>
      <div className="flex-1 bg-gray-100 flex w-full justify-center ">
        {isLoading && (
          <div className="w-full flex flex-1 items-center justify-center">
            <MainSpinner />
          </div>
        )}
        {!isLoading && (
          <div className="w-full py-4 min-w-[940px] overflow-x-scroll pl-36 pr-12 lg:px-0  md:px-0">
            <h1 className="text-indigo-500  font-extrabold  pt-6 -mb-16 px-24">
              My Orders
            </h1>
            <OrderList isLoading={isLoading} orderData={userData} />
          </div>
        )}
      </div>
    </>
  );
}

export default withAuth(MyOrders);
