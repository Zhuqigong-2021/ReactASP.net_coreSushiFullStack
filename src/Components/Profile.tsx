import { useSelector } from "react-redux";
import { userModel } from "../interfaces";
import { RootState } from "../Storage/Redux/store";
import { useGetUsersQuery, useUpdateUserPhoneMutation } from "../Apis/userApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [oneUserData, setOneUserData] = useState<userModel>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [updateUserPhone] = useUpdateUserPhoneMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetUsersQuery(null);
  useEffect(() => {
    if (!isLoading) {
      let foundUser = data?.apiResponse.result.filter(
        (u: userModel) => u.id == userData.id
      )[0];
      setOneUserData(foundUser);
    }
  }, [isLoading, data]);

  const handleUpdateUserPhoneNumber = async (userId: string, phone: string) => {
    if (!phone) {
      toast.error("No Phone Number to be updated");
      return;
    }
    await updateUserPhone({ userId, phone });
    toast.success("you have successfully updated your phone number");
  };
  useEffect(() => {
    console.log(phoneNumber);
  }, [phoneNumber]);
  console.log(oneUserData);
  return (
    <div className="bg-gray-50 h-full p-6 py-12 justify-start flex items-start">
      <div>
        <div className="h-32 w-32">
          <img
            src="https://randomuser.me/portraits/men/1.jpg"
            alt=""
            className="rounded-full h-full w-full "
          />
        </div>

        <h2 className="font-extrabold text-2xl mt-6">
          <span>Name:</span> {userData.fullName}
        </h2>
        <h2 className="font-extrabold text-2xl mt-6">
          <span>Email:</span> {userData.email}
        </h2>
        <h2 className="font-extrabold text-2xl mt-6">
          <span>Role:</span> {userData.role}
        </h2>

        <h2 className=" mt-6 flex space-x-2">
          <span className="font-extrabold text-2xl">Phone:</span>
          <div className="w-44  flex items-center">
            {oneUserData?.phoneNumber}
          </div>
          <button
            className="bg-indigo-500 text-white rounded-lg p-2"
            onClick={() => setIsToggle(true)}
          >
            Edit
          </button>
          {isToggle && (
            <div className="absolute left-28">
              <input
                type="number"
                className="h-10"
                placeholder={oneUserData?.phoneNumber}
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNumber(e.target.value)
                }
              />
              <button
                onClick={() => {
                  handleUpdateUserPhoneNumber(userData.id, phoneNumber);
                  setIsToggle(false);
                }}
                className="bg-indigo-500 text-white rounded-lg p-2"
              >
                save
              </button>
              <button
                className="bg-rose-400 text-white rounded-lg p-2 ml-2"
                onClick={() => setIsToggle(false)}
              >
                cancel
              </button>
            </div>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Profile;
