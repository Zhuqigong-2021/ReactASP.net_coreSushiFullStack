import { useEffect, useState } from "react";
import MiniSpinner from "../../../Common/MiniSpinner";
// import { useNavigate } from "react-router-dom";
import { apiResponse, cartItemModel } from "../../../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import inputHelper from "../../../Helper/inputHelper";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

export default function CartPickUpDetails() {
  const [loading, setLoading] = useState(false);
  const paymentStatus: boolean = useSelector(
    (state: RootState) => state.paymentStatusStore.status
  );
  // console.log("currentPaymentStatus:", paymentStatus);
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);
  useEffect(() => {
    if (paymentStatus) {
      setLoading(false);
    }
  }, [paymentStatus]);

  let grandTotal = 0;
  let totalItems = 0;
  // const initialUserData = {
  //   name: "",
  //   email: "",
  //   phoneNumber: "",
  // };
  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };
  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });
  //   const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
    });
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);

    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });
  };

  return (
    <div className="pb-5 pt-3">
      <h1 className="text-3xl font-extrabold my-4 mb-8">Details</h1>
      <hr />

      <form onSubmit={handleSubmit} className=" mx-auto">
        <div className="flex items-center space-x-2 mt-3 p-2">
          <span>Name:</span>
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="flex items-center space-x-2 mt-3 p-2">
          <span>Email:</span>
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="flex items-center space-x-2 mt-3 p-2">
          <span>Phone:</span>
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className=" mt-3">
          <div
            className=" px-2 py-3 flex flex-col space-y-3 rounded-lg"
            style={{ background: "ghostwhite" }}
          >
            <div className="flex justify-between">
              <span>items:</span>{" "}
              <span className="font-bold text-lg">{totalItems}(items)</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>{" "}
              <span className="font-bold text-lg">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-b-2 border-gray-300">
              <span>Tax(15%):</span>
              <span className="font-bold text-lg">
                ${(grandTotal * 0.15).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between mt-5 ">
              <span className="text-xl font-extrabold">Total:</span>{" "}
              <span className="font-bold text-lg">
                ${(grandTotal * 1.15).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white mt-5 w-full py-4 rounded-full flex justify-center "
          disabled={loading || shoppingCartFromStore.length == 0}
        >
          {loading ? <MiniSpinner /> : " Place Order"}
        </button>
      </form>
    </div>
  );
}
