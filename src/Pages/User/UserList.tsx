import { Fragment, useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "../../Apis/userApi";
import MainSpinner from "../../Common/MainSpinner";
import { userGrantModel, userRoleModel } from "../../interfaces";
import { MdOutlineSaveAlt } from "react-icons/md";
import { toast } from "react-toastify";
import { withAdminAuth } from "../../HOC";
import MiniSpinner from "../../Common/MiniSpinner";
import { LiaEdit } from "react-icons/lia";
import { BsTextIndentLeft, BsTrash } from "react-icons/bs";
import { Modal } from "../../Components";
import { useModal } from "../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { SD_SortTypes } from "../../Utility/SD";
import {
  HiChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

const UserList = () => {
  let intialRole: any = {};
  let EditStatus: any = {};
  const { data: roleApiData, isLoading: loading } = useGetRolesQuery(null);

  const [updateUserRole] = useUpdateUserRoleMutation();
  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );
  const [userData, setUserData] = useState<userGrantModel[]>([]);
  const [roleData, setRoleData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(intialRole);
  const [filteredData, setFilteredData] = useState<userGrantModel[] | null>();
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  const { data, isLoading } = useGetUsersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  let ROLE_OPTIONS = ["admin", "employee", "customer"];
  const [isEdit, setEdit] = useState(EditStatus);
  const [
    currentTransaction,
    setCurrentTransaction,
  ] = useState<userGrantModel | null>(null);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  const openModal = (transaction: userGrantModel) => {
    setModalOpen(true);
    setCurrentTransaction(transaction);
  };

  //   useEffect(() => {
  //     setFilters({ ...filters, searchString: searchValue });
  //   }, [searchValue, filters.status]);
  //   useEffect(() => {
  //     setApiFilters({
  //       status: filters.status,
  //       searchString: searchValue,
  //     });
  //   }, [searchValue, filters.status]);

  useEffect(() => {
    if (data) {
      //   let tempArray: userGrantModel[] = [...data.apiResponse.result];
      //   tempArray = tempArray.sort(
      //     (a: userGrantModel, b: userGrantModel) =>
      //       a.name.toUpperCase().charCodeAt(0) -
      //       b.name.toUpperCase().charCodeAt(0)
      //   );
      setUserData(data.apiResponse.result);

      const { TotalRecords } = JSON.parse(data.totalRecords);

      setTotalRecords(TotalRecords);
    }
  }, [data]);
  useEffect(() => {
    if (userData) {
      setFilteredData(handleSearch(searchValue, sortName));
    }
  }, [userData]);

  useEffect(() => {
    setApiFilters({ ...apiFilters, searchString: searchValue });
    setFilteredData(handleSearch(searchValue, sortName));
  }, [searchValue]);
  const handleSearch = (searchValue: string | null, sortType: SD_SortTypes) => {
    let tempArray = [...userData];
    if (searchValue) {
      tempArray = userData.filter(
        (user: userGrantModel) =>
          user.name
            .toLowerCase()
            .includes(filters.searchString.toLowerCase()) ||
          user.userName
            .toLowerCase()
            .includes(filters.searchString.toLowerCase()) ||
          user.roleName
            .toLowerCase()
            .includes(filters.searchString.toLowerCase()) ||
          user.id.toLowerCase().includes(filters.searchString.toLowerCase()) ||
          user.phoneNumber
            ?.toLowerCase()
            .includes(filters.searchString.toLowerCase())
      );
    }

    setFilteredData(filteredData);

    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: userGrantModel, b: userGrantModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: userGrantModel, b: userGrantModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
  };

  useEffect(() => {
    if (userData.length) {
      userData.map(
        (user: userGrantModel) => (intialRole[user.id] = user.roleName)
      );
      userData.map((user: userGrantModel) => (EditStatus[user.id] = false));
      //   console.log(role);
    }
  }, [data]);
  useEffect(() => {
    if (roleApiData) {
      setRoleData(roleApiData.result);
    }
  }, [roleApiData]);

  const handleSave = async (userId: string) => {
    const currentRole = role[userId];
    const thisUser: userGrantModel[] = userData.filter(
      (user: userGrantModel) => user.id == userId
    );

    if (!currentRole || currentRole == thisUser[0].roleName) {
      toast.error("You are in this role");
      return;
    }
    const { id: roleId } = roleData.filter(
      (r: userRoleModel) => r.name == currentRole
    )[0];

    if (roleId && userId) {
      await updateUserRole({ userId, roleId });

      toast("you have successfully authorize a role");
    } else {
      toast.error("You are in this role");
      return;
    }
  };
  const handleFilters = (index: number) => {
    const status = sortOptions[index];

    setFilters({ searchString: searchValue, status: status });
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });

    setSortName(sortOptions[index]);

    const tempArray = handleSearch(searchValue, sortOptions[index]);
    // setUserData(tempArray);

    setFilteredData(tempArray);
  };
  //   const handleDeleteUser = async (userId: string) => {
  //     const shouldDelete = window.confirm(
  //       "Are you sure you want to delete this user?"
  //     );

  //     if (shouldDelete && userId) {
  //       await deleteUser({ userId });
  //       alert(userId);
  //       toast("you have successfully deleted this user");
  //     } else {
  //       toast.error("delete failed");
  //       return;
  //     }
  //   };
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
    <div className="flex-1 bg-gray-100 flex w-full justify-center overflow-x-scroll  ">
      {isLoading && (
        <div className=" flex-1 w-full flex justify-center items-center">
          <MainSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col py-6 pt-16 px-20  mx-5 mt-5 bg-gray-50 w-full  min-w-[1300px] overflow-x-scroll pl-[450px] md:px-20 lg:px-20  no-scrollbar">
          <div className="flex justify-between">
            <h1 className="text-2xl font-extrabold text-indigo-500 mb-4">
              All Users
            </h1>
            <button
              className="relative flex items-center space-x-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <BsTextIndentLeft className="scale-150" />{" "}
              <span className="text-sm font-bold">Filter</span>
              {isFilterOpen && (
                <div className="absolute right-0 -bottom-14  bg-white rounded-lg py-2 z-10">
                  <div className="flex flex-col text-sm font-bold  w-40 text-right">
                    {sortOptions.map((item, index) => (
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

          <div className="flex flex-col  w-full ">
            <div className="grid grid-cols-7   mb-4 px-4 py-4 text-white items-center justify-between w-full  bg-indigo-500 ">
              <div className="flex items-center text-left text-lg col-span-2 space-x-2 text-[15px] ">
                <span>Id</span>
              </div>
              <div className="flex items-center text-left text-lg space-x-2 text-[15px] ">
                <span>Name</span>
              </div>
              <div className="flex items-center text-left text-lg  space-x-2 text-[15px] ">
                <span>User Name</span>
              </div>
              <div className="flex items-center text-left text-lg text-[15px] ">
                Phone
              </div>
              <div className="flex items-center text-left text-lg text-[15px] ">
                Role
              </div>

              <div className="flex items-center text-left text-lg text-[15px]  ">
                Authorization
              </div>
            </div>
            {filteredData &&
              filteredData.map((user: userGrantModel, index: number) => {
                intialRole[user.id] = user.roleName;

                return (
                  <Fragment key={index}>
                    <div className="grid grid-cols-7 w-full px-4 py-4 mb-4  border border-gray-200 items-center">
                      <div className="col-span-2 flex items-center">
                        {user.id}
                      </div>
                      <div className=" flex items-center">{user.name}</div>
                      <div className=" flex items-center">{user.userName}</div>
                      <div className=" flex items-center">
                        {user?.phoneNumber}
                      </div>
                      <div className=" flex items-center">{user.roleName}</div>
                      <div className="flex items-center space-x-2 ">
                        <div className="relative flex flex-col ">
                          <button
                            className="bg-violet-400 p-2 rounded-lg text-white"
                            onClick={() =>
                              setEdit({
                                ...EditStatus,
                                [user.id]: !isEdit[user.id],
                              })
                            }
                          >
                            <LiaEdit />
                          </button>
                          {isEdit[user.id] && (
                            <div className="absolute top-8 space-y-2 flex flex-col bg-white py-4 rounded-lg z-50">
                              {ROLE_OPTIONS.map((r, i) => {
                                return (
                                  <span
                                    key={i}
                                    className="hover:bg-cyan-200 px-2"
                                    onClick={() => {
                                      if (intialRole) {
                                        setRole({
                                          ...intialRole,
                                          [user.id]: ROLE_OPTIONS[i],
                                        });
                                        setEdit({
                                          ...EditStatus,
                                          [user.id]: false,
                                        });
                                      }
                                    }}
                                  >
                                    {r}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* <select
                      id=""
                      name="role"
                      onChange={(e) =>
                        setRole({ ...intialRole, [user.id]: e.target.value })
                      }
                    >
                      <option className="" value={user.roleName}>
                        {user.roleName}
                      </option>
                      {ROLE_OPTIONS.filter((r) => r != user.roleName).map(
                        (role, i) => {
                          return (
                            <option value={role} key={i}>
                              {role}
                            </option>
                          );
                        }
                      )}
                    </select> */}
                        <button
                          className="bg-fuchsia-300 rounded-lg text-white p-2"
                          onClick={() => handleSave(user.id)}
                        >
                          {loading && <MiniSpinner />}
                          {!loading && <MdOutlineSaveAlt />}
                        </button>

                        <button
                          className="bg-rose-400 text-white p-2 rounded-lg"
                          onClick={() => openModal(user)}
                          // onClick={() => handleDeleteUser(user.id)}
                        >
                          <BsTrash />
                        </button>
                      </div>
                    </div>
                    {isModalOpen && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex justify-center items-center">
                        <Modal
                          // isOpen={isModalOpen}
                          transaction={currentTransaction}
                          closeModal={() => setModalOpen(false)}
                        />
                      </div>
                    )}
                  </Fragment>
                );
              })}
          </div>
          <div className="flex justify-end  space-x-4 bg-gray-50 py-4 items-center">
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
  );
};

export default withAdminAuth(UserList);
