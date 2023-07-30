import { withAuth } from "../HOC";
import { useScreenSize } from "../Helper";
import { CartPickUpDetails, CartSummary } from "./Page/Cart";

interface CartProps {
  isToggle: boolean;
}
const ShoppingCart = (props: CartProps) => {
  const { isToggle } = props;
  const { width } = useScreenSize();
  return (
    <div
      className="h-screen overflow-y-scroll  top-0 right-0 lg:static  bg-white"
      style={{
        position: width > 1450 ? "static" : "absolute",
        width: isToggle
          ? width > 1450
            ? "25%"
            : width > 1250
            ? "35%"
            : "80%"
          : "0",
        padding: isToggle ? "2rem" : "0",
        transition: "all 1s ease-in-out",
      }}
    >
      <CartSummary />
      <CartPickUpDetails />
    </div>
  );
};
export default withAuth(ShoppingCart);
