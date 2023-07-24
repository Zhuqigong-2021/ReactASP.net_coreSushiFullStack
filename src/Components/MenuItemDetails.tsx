import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import MiniSpinner from "../Common/MiniSpinner";
import { apiResponse, userModel } from "../interfaces";
import { toastNotify } from "../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
//id=4bf25e1f-cbe9-4749-949e-a8300b8c7b55
const MenuItemDetails = () => {
  const { menuItemId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };
  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);
    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="bg-gray-50 h-full px-2 py-16  md:px-8 lg:px-16">
      {!isLoading ? (
        <div className="flex flex-col space-y-8 p-4  lg:flex-row lg:space-x-16">
          <div className="overflow-hidden">
            <img src={data.result.image} alt="" />
          </div>
          <div className="mt-2">
            <div className=" border-b-2 border-gray-300 py-4">
              <h4 className="text-4xl font-extrabold mb-5">
                {data.result.name}
              </h4>
              <div className="flex space-x-2">
                <span className=" bg-gray-800 text-white text-sm px-4 py-2 rounded-lg">
                  {data.result.category}
                </span>
                {/* <span className=" ml-4 flex items-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
                <AiOutlineStar />
                {data.result.specialTag}
              </span> */}
                {data.result.specialTag && (
                  <div className="flex items-center bg-blue-600 text-white text-sm space-x-1 py-2 px-4 rounded-lg">
                    <AiOutlineStar /> {data.result.specialTag}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              category Name:&nbsp;
              <span className="font-extrabold">{data.result.category}</span>
            </div>
            <div>
              price:
              <span className="font-extrabold">${data.result.price}</span>
            </div>

            <p className="mt-8 max-w-md text-lg border-b-2 py-4 mb-4 border-gray-300">
              <div className="mb-4">Description:</div>
              {data.result.description}
              {data.result.description}
              {data.result.description}
            </p>

            {/* <div className="my-4"> */}
            <div className="border border-gray-300 rounded-full flex justify-center items-center space-x-4  h-10 w-1/4">
              <span
                className="p-2 cursor-pointer text-2xl font-bold"
                onClick={() => handleQuantity(-1)}
              >
                -
              </span>
              <div>{quantity}</div>

              <span
                className="p-2 cursor-pointer text-2xl font-bold"
                onClick={() => handleQuantity(1)}
              >
                +
              </span>
            </div>
            {/* </div> */}

            <div className="flex flex-col space-y-4 mt-5 space-x-0 md:flex-row md:space-x-2 md:space-y-0 lg:flex-row lg:space-x-4 lg:space-y-0">
              {isAddingToCart ? (
                <button
                  onClick={() => handleAddToCart(data.result.id)}
                  disabled
                  className="bg-orange-400 px-4 py-2 text-white rounded-full"
                >
                  <MiniSpinner />
                </button>
              ) : (
                <button
                  onClick={() => handleAddToCart(data.result.id)}
                  className="bg-orange-400 px-4 py-2 text-white rounded-full"
                >
                  Add to Cart
                </button>
              )}
              <button
                onClick={() => navigate(-1)}
                className="bg-green-600 px-4 py-2 text-white rounded-full"
              >
                Choose from menus
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MenuItemDetails;
