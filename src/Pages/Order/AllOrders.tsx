import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import MainSpinner from "../../Common/MainSpinner";
import OrderList from "../../Components/Order/OrderList";

import { SD_Status } from "../../Utility/SD";
import { BsTextIndentLeft } from "react-icons/bs";

import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  HiChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

const AllOrders = () => {
  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  const [orderData, setOrderData] = useState([]);
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    setFilters({ ...filters, searchString: searchValue });
  }, [searchValue, filters.status]);
  useEffect(() => {
    setApiFilters({
      status: filters.status,
      searchString: searchValue,
    });
  }, [searchValue, filters.status]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterOptions = [
    "All",
    SD_Status.CONFIRMED,
    SD_Status.BEING_COOKED,
    SD_Status.READY_FOR_PICKUP,
    SD_Status.CANCELLED,
  ];

  const handleFilters = (i: number) => {
    // const tempData = data.result.filter((orderData: orderHeaderModel) => {
    //   if (
    //     (orderData.pickupName && orderData.pickupName.includes(searchValue)) ||
    //     (orderData.pickupEmail &&
    //       orderData.pickupEmail.includes(searchValue)) ||
    //     (orderData.pickupPhoneNumber &&
    //       orderData.pickupPhoneNumber.includes(searchValue))
    //   ) {
    //     return orderData;
    //   }
    // });
    const status = filterOptions[i] == "All" ? "" : filterOptions[i];
    setFilters({ searchString: searchValue, status: status });
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });

    // const finalArray = data.result.filter((orderData: orderHeaderModel) =>
    //   filters.status !== "" ? orderData.status === filters.status : orderData
    // );
    // // console.log(status);
    // // console.log("status:", filters.status);
    // // console.log("search string:", filters.searchString);
    // // console.log("final array:", finalArray);
    // setOrderData(finalArray);
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);

      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;
    return `${dataStartNumber}
      -
      ${
        dataEndNumber < totalRecords ? dataEndNumber : totalRecords
      } of ${totalRecords}`;
  };

  const handlePageOptionChange = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber - 1 });
    } else if (direction === "next") {
      setPageOptions({ pageSize: 5, pageNumber: pageOptions.pageNumber + 1 });
    } else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : 5,
        pageNumber: 1,
      });
    }
  };

  return (
    <>
      <div className="flex-1 bg-gray-100 flex w-full justify-center ">
        {isLoading && (
          <div className="w-full flex flex-1 items-center justify-center">
            <MainSpinner />
          </div>
        )}
        {!isLoading && (
          <div className="w-full py-4 min-w-[1100px] overflow-x-scroll pl-56 pr-36 lg:px-0  md:px-0">
            <div className="flex justify-between -mb-16 px-24 items-center pt-6">
              <h1 className="text-indigo-500  font-extrabold   ">
                Orders List
              </h1>
              <button
                className="relative flex items-center space-x-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <BsTextIndentLeft className="scale-150" />{" "}
                <span className="text-sm font-bold">Filter</span>
                {isFilterOpen && (
                  <div className="absolute right-0 -bottom-32  bg-white rounded-lg py-2 z-10">
                    <div className="flex flex-col text-sm font-bold  w-40 text-right">
                      {filterOptions.map((item, index) => (
                        <span
                          key={index}
                          onClick={() => handleFilters(index)}
                          className="hover:bg-indigo-200 px-2"
                          // onClick={() => handleSortClick(index)}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            </div>

            <OrderList isLoading={isLoading} orderData={orderData} />
            <div className="flex justify-end pr-28 space-x-4 bg-gray-50 py-4 items-center">
              <div>rows/page:</div>
              <div>
                <select
                  className="w-16 text-gray-400  flex text-center"
                  value={currentPageSize}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handlePageOptionChange("change", Number(e.target.value));
                    setCurrentPageSize(Number(e.target.value));
                  }}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>
              </div>
              <div>{getPageDetails()}</div>
              <button
                disabled={pageOptions.pageNumber === 1}
                onClick={() => handlePageOptionChange("prev")}
                className=" border rounded-lg border-indigo-500 p-2 focus:bg-indigo-500 focus:text-white"
              >
                <HiChevronDoubleLeft />
              </button>
              <button
                disabled={
                  pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
                }
                onClick={() => handlePageOptionChange("next")}
                className=" border rounded-lg border-indigo-500 p-2 focus:bg-indigo-500 focus:text-white"
              >
                <HiOutlineChevronDoubleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllOrders;
