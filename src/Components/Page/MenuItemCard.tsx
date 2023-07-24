import { apiResponse, menuItemModel, userModel } from "../../interfaces";
import { AiOutlineStar } from "react-icons/ai";
// import { TfiShoppingCart } from "react-icons/tfi";
import { BsCart4 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../../Apis/shoppingCartApi";
import MiniSpinner from "../../Common/MiniSpinner";
import { toastNotify } from "../../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
interface Props {
  menuItem: menuItemModel;
}
const MenuItemCard = (props: Props) => {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };
  return (
    <div className="relative rounded-[25px] h-42 border-2  overflow-hidden shadow-md">
      <div className="h-36  border-2">
        <Link to={`/menuItemDetails/${props.menuItem.id}`}>
          <img
            src={props.menuItem.image}
            alt=""
            className="h-36 w-full object-cover"
          />
        </Link>
      </div>
      <div className="p-2 pb-0">
        <h4 className="text-lg font-extrabold mb-1">{props.menuItem.name}</h4>
        <span className="bg-gray-400 text-white px-2 py-1 text-xs rounded-full ">
          {props.menuItem.category}
        </span>
        <p className="mt-3 text-xl font-extrabold tracking-widest  scale-y-95 ">
          ${props.menuItem.price}
          <span className="text-gray-400 text-sm ">/portion</span>
        </p>
        <span className=" absolute top-2 left-2 bg-blue-600 text-white rounded-full">
          {props.menuItem.specialTag && (
            <div className="flex items-center space-x-1 py-2 px-4 ">
              <AiOutlineStar /> {props.menuItem.specialTag}
            </div>
          )}
        </span>
        <button onClick={() => handleAddToCart(props.menuItem.id)}>
          {isAddingToCart ? (
            <div className="scale-150 absolute bottom-5 right-1 text-orange-500 ">
              <MiniSpinner />
            </div>
          ) : (
            <BsCart4
              strokeWidth="0"
              className="scale-150 absolute bottom-5 right-4 text-amber-600 "
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
