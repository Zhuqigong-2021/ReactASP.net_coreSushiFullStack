import { SD_Status } from "../Utility/SD";

const getStatusColor = (status: SD_Status) => {
  return status === SD_Status.CONFIRMED
    ? "blue-500"
    : status === SD_Status.PENDING
    ? "gray-500"
    : status === SD_Status.CANCELLED
    ? "red-500"
    : status === SD_Status.COMPLETED
    ? "green-500"
    : status === SD_Status.BEING_COOKED
    ? "cyan-500"
    : status === SD_Status.READY_FOR_PICKUP && "amber-500";
};

export default getStatusColor;
