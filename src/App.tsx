import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Layout/Header";

import { useEffect, useState } from "react";
import {
  Dashboard,
  Home,
  Order,
  Payment,
  Profile,
  NotFound,
  MenuItemDetails,
  ShoppingCart,
  SideBar,
} from "./Components";
import {
  AccessDenied,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Login,
  OrderConfirm,
  Register,
  AllOrders,
  MyOrders,
  OrderDetails,
  MenuItemList,
  MenuItemUpsert,
} from "./Pages";
import { setShoppingCart } from "./Storage/Redux/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "./Apis/shoppingCartApi";
import { setLoggedInUser } from "./Storage/Redux/userAuthSlice";
import { userModel } from "./interfaces";
import jwt_decode from "jwt-decode";
import { RootState } from "./Storage/Redux/store";
import UserList from "./Pages/User/UserList";

const App: React.FC = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [skip, setSkip] = useState(true);
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData?.id, {
    skip: skip,
  });
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (userData?.id) {
      setSkip(false);
    }
  }, [userData]);

  return (
    <div className="flex overflow-hidden w-full">
      <SideBar isToggle={isToggle} setIsToggle={setIsToggle} />
      <div className="relative flex flex-col w-full ml-[60px] flex-1  min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order/orderConfirmed/:id" element={<OrderConfirm />} />
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="user/allUsers" element={<UserList />} />
          <Route path="/menuItem/menuitemlist" element={<MenuItemList />} />
          <Route
            path="/menuItem/menuitemUpsert/:id"
            element={<MenuItemUpsert />}
          />
          <Route path="/menuItem/menuitemUpsert" element={<MenuItemUpsert />} />

          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {userData?.id && <ShoppingCart isToggle={isToggle} />}
    </div>
  );
};

export default App;
