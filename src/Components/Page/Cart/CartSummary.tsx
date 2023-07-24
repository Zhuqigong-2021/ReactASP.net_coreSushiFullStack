import { useDispatch, useSelector } from "react-redux";
import { cartItemModel, userModel } from "../../../interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { BsTrash } from "react-icons/bs";
import {
  removeFromCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppingCartMutation } from "../../../Apis/shoppingCartApi";

const CartSummary = () => {
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const shoppingCartFromStore: cartItemModel[] | null = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy == -1 && cartItem.quantity == 1) ||
      updateQuantityBy == 0
    ) {
      //remove the item
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: 0,
        userId: userData.id,
      });
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      //   update the quantity with the new quantity
      updateShoppingCart({
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
        userId: userData.id,
      });
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };
  return (
    <div className=" ">
      {shoppingCartFromStore?.length > 0 && (
        <h2 className="text-3xl font-extrabold mb-10 ml-2">Cart Items</h2>
      )}
      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div key={index} className="flex  border-b-2 border-gray-300">
          <div className="h-32 w-48 rounded-[20px] overflow-hidden  m-2 ">
            <img
              src={cartItem.menuItem?.image}
              alt=""
              className="h-30 w-30 rounded-lg h-full object-cover"
            />
          </div>
          <div className="pt-2   w-full relative">
            <h4 className="font-extrabold text-lg">
              {cartItem.menuItem?.name}
            </h4>
            <div className="text-sm">{cartItem.menuItem?.category}</div>
            <p>${cartItem.menuItem!.price}</p>
            <div className=" flex justify-between items-center mt-4 ">
              <div className=" flex space-x-1 w-24 justify-between">
                <button
                  onClick={() => handleQuantity(-1, cartItem)}
                  className="focus:bg-orange-500 w-6 h-6 focus:text-white focus:border-none text-amber-600 border border-gray-300 rounded-lg text-lg flex items-center justify-center"
                >
                  -
                </button>
                <p>{cartItem.quantity}</p>
                <button
                  onClick={() => handleQuantity(1, cartItem)}
                  className="focus:bg-orange-500 w-6 h-6 focus:text-white focus:border-none text-amber-600 border border-gray-300 rounded-lg text-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <h4 className="font-extrabold text-2xl text-amber-600">
                ${(cartItem.quantity! * cartItem.menuItem!.price).toFixed(2)}
              </h4>

              <div
                className="absolute top-4 right-0"
                onClick={() => handleQuantity(0, cartItem)}
              >
                <BsTrash />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
