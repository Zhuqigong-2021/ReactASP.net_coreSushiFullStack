import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userModel } from "../../interfaces";
import { RootState } from "../../Storage/Redux/store";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useState } from "react";
import { setSearchItem } from "../../Storage/Redux/searchSlice";

const Header = () => {
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  let today = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItem(e.target.value));
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        position: pathname == "/" ? "absolute" : "relative",
        top: pathname == "/" ? "0px" : "",
      }}
      className="w-full h-28 bg-white flex justify-between items-center px-10  "
    >
      <div className="relative w-1/3 my-4  ">
        <input
          type="text"
          className="h-10 w-full outline outline-1 outline-gray-300 focus:outline-orange-500  rounded-lg px-2"
          value={value}
          onChange={handleChange}
        />
        <BsSearch className="absolute right-4 top-3 scale-150" />
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex flex-col text-right -space-y-2">
          <div className="font-semibold text-xl">{userData?.email}</div>
          <div className="font-semibold text-lg text-gray-500">
            {userData?.id && today}
          </div>
        </div>
        <div className="relative h-12 w-12   ">
          {!userData?.id ? (
            <div className="absolute top-0 right-0 left-0 bottom-0 ">
              <IoPersonCircleSharp
                // className="scale-[3.5]"
                className="h-full w-full"
              />
            </div>
          ) : (
            <img
              src="https://randomuser.me/portraits/men/1.jpg"
              alt="portraits"
              className="rounded-full h-full w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
