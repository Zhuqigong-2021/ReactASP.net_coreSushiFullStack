import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiFlowerLotus } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { BsPersonVcard, BsHandbag } from "react-icons/bs";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { RiShutDownLine } from "react-icons/ri";

import { AiOutlineHistory } from "react-icons/ai";
import { TbArrowsMoveHorizontal } from "react-icons/tb";
import { CgArrowLeftR } from "react-icons/cg";
import { cartItemModel, userModel } from "../../interfaces";
import { RootState } from "../../Storage/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { BiLogInCircle } from "react-icons/bi";
import {
  MdOutlineBorderAll,
  MdOutlineReorder,
  MdOutlineMenuOpen,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/userAuthSlice";
import { SD_Roles } from "../../Utility/SD";

interface MenuProps {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function SideBar(props: MenuProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isToggle, setIsToggle } = props;
  const [isWidth, setWidth] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState<boolean>(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore?.cartItems ?? []
  );
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsToggle(false);
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/login");
  };
  useEffect(() => {
    setAdminMenuOpen(!isAdminMenuOpen);
  }, []);
  return (
    <div
      className="flex flex-col space-y-10  p-2 h-screen bg-white fixed top-0 bottom-0 left-0 z-10 "
      style={{
        width: isWidth ? "160px" : "70px",
        transition: "all 1s ease-in-out",
        alignItems: isWidth ? "start" : "center",
      }}
    >
      <Link
        to="/"
        className="text-orange-600 py-7 p-4"
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
        }}
      >
        <PiFlowerLotus style={{ transform: "scale(2)" }} />
        {isWidth ? <span className="ml-4">Home</span> : ""}
      </Link>
      {userData?.role == SD_Roles.ADMIN ||
      userData?.role == SD_Roles.EMPLOYEE ? (
        <div className="relative">
          <button
            style={{
              display: isWidth ? "flex" : "",
              alignItems: "center",
              marginBottom: isWidth ? "-2rem" : 0,
            }}
            onClick={() => setAdminMenuOpen(!isAdminMenuOpen)}
            className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg focus:underline-offset-1 focus:text-orange-600 "
          >
            <RxDashboard className="focus:underline-offset-2 scale-150  focus:text-orange-600" />
            {isWidth ? <span className="ml-4">Dashboard</span> : ""}
          </button>
          {!isAdminMenuOpen && (
            <div
              className="absolute top-0   w-36  py-4 rounded-lg bg-white shadow-lg"
              style={{ translate: isWidth ? "162px" : "70px" }}
            >
              <ul className="flex flex-col w-full">
                <li
                  className="cursor-pointer flex items-center space-x-4  hover:bg-amber-200 px-2"
                  onClick={() => {
                    setAdminMenuOpen(!isAdminMenuOpen);
                    navigate("menuItem/menuitemlist");
                  }}
                >
                  <MdOutlineMenuOpen /> <span>Menu Item</span>
                </li>
                <li
                  className="cursor-pointer flex items-center space-x-4 hover:bg-amber-200 px-2"
                  onClick={() => {
                    setAdminMenuOpen(!isAdminMenuOpen);
                    navigate("order/myorders");
                  }}
                >
                  {/* <span className="p-1 border border-gray-300 rounded-lg"> */}
                  <MdOutlineBorderAll />
                  {/* </span>{" "} */}
                  <span>My Orders</span>
                </li>
                <li
                  className="cursor-pointer flex items-center space-x-4 hover:bg-amber-200 px-2"
                  onClick={() => {
                    setAdminMenuOpen(!isAdminMenuOpen);
                    navigate("order/allOrders");
                  }}
                >
                  <MdOutlineReorder /> <span>All Orders</span>
                </li>

                <li
                  className="cursor-pointer flex items-center space-x-4 hover:bg-amber-200 px-2"
                  onClick={() => {
                    setAdminMenuOpen(!isAdminMenuOpen);
                    navigate("user/allUsers");
                  }}
                >
                  <HiUserGroup /> <span>All Users</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/dashboard"
          style={{
            display: isWidth ? "flex" : "",
            alignItems: "center",
            marginBottom: isWidth ? "-2rem" : 0,
          }}
          className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg focus:underline-offset-1 focus:text-orange-600 "
        >
          <RxDashboard className="focus:underline-offset-2 scale-150  focus:text-orange-600" />
          {isWidth ? <span className="ml-4">Dashboard</span> : ""}
        </Link>
      )}

      <Link
        to="/order"
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
          width: isWidth ? "140px" : "45px",
          marginBottom: isWidth ? "-2rem" : 0,
        }}
        className="scale-120 text-gray-500 focus:bg-orange-200 p-4 rounded-lg  focus:text-orange-600"
      >
        <AiOutlineMenuUnfold className="scale-150" />
        {isWidth ? <span className="ml-4">Order</span> : ""}
      </Link>
      <Link
        to="/profile"
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
          width: isWidth ? "140px" : "45px",
          marginBottom: isWidth ? "-2rem" : 0,
        }}
        className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg  focus:text-orange-600"
      >
        <BsPersonVcard className="scale-150" />
        {isWidth ? <span className="ml-4">Profile</span> : ""}
      </Link>
      <button
        onClick={() => setIsToggle(!isToggle)}
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
          marginBottom: isWidth ? "-2rem" : 0,
          width: isWidth ? "140px" : "45px",
        }}
        className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg  focus:text-orange-600"
      >
        <div className="relative">
          <BsHandbag className="scale-150" />
          {userData?.id && (
            <div className="absolute top-3/4 left-2/3 -translate-x-1/2 -translate-y-1/2 scale-75 text-orange-500">
              {shoppingCartFromStore?.length
                ? `${shoppingCartFromStore.length}`
                : ""}
            </div>
          )}
        </div>

        {isWidth ? <div className="ml-4">Cart</div> : ""}
      </button>
      {/* <Link
        to="/payment"
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
          marginBottom: isWidth ? "-2rem" : 0,
          width: isWidth ? "140px" : "45px",
        }}
        className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg  focus:text-orange-600"
      >
        <MdOutlinePayment className="scale-150" />
        {isWidth ? <span className="ml-4">Payment</span> : ""}
      </Link> */}

      <Link
        to="/order/myorders"
        style={{
          display: isWidth ? "flex" : "",
          alignItems: "center",
          justifyContent: "center",
          width: isWidth ? "140px" : "45px",
          marginBottom: isWidth ? "-2rem" : 0,
        }}
        className=" text-gray-500 focus:bg-orange-200 p-4 rounded-lg  focus:text-orange-600"
      >
        <AiOutlineHistory
          style={{ transform: isWidth ? "scale(2.8)" : "scale(1.5)" }}
        />
        {isWidth ? <span className="ml-4">Orderstatus</span> : ""}
      </Link>

      <div className="absolute bottom-10 flex flex-col space-y-8">
        {userData?.id && (
          <NavLink
            onClick={handleLogout}
            to="/login"
            style={{
              display: isWidth ? "flex" : "",
              alignItems: "center",
              width: isWidth ? "140px" : "45px",
            }}
            className="p-4"
          >
            <RiShutDownLine
              className="scale-150  text-orange-600 font-bold rounded-full"
              strokeWidth="1"
            />
            {isWidth ? <span className="ml-4">Signout</span> : ""}
          </NavLink>
        )}
        {!userData?.id && (
          <Link
            to="/login"
            style={{
              display: isWidth ? "flex" : "",
              alignItems: "center",
              width: isWidth ? "140px" : "45px",
            }}
            className="p-4"
          >
            <BiLogInCircle
              className="scale-150  text-orange-600 font-bold rounded-full"
              strokeWidth="1"
            />
            {isWidth ? <span className="ml-4">Login</span> : ""}
          </Link>
        )}

        <button onClick={() => setWidth(!isWidth)} className="p-4">
          {isWidth ? (
            <CgArrowLeftR className="scale-150 " />
          ) : (
            <TbArrowsMoveHorizontal className="scale-150" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
