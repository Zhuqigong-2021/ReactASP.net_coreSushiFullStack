import orderHeaderModel from "../../interfaces/orderHeaderModel";

export default interface OrderListProps {
  isLoading: boolean;
  orderData: orderHeaderModel[];
}
