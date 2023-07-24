import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center bg-orange-50 flex-1 w-full border">
      <div className="page-wrap text-center">
        <div className="page-not-found flex flex-col justify-center items-center">
          <img
            src="https://res.cloudinary.com/razeshzone/image/upload/v1588316204/house-key_yrqvxv.svg"
            className="img-key w-36 h-36"
            alt=""
          />
          <h1 className="text-9xl font-black text-center text-red-500">
            <span>4</span>
            <span>0</span>
            <span className="broken">3</span>
          </h1>
          <h4 className="text-4xl text-amber-600 my-5">Access Denied !</h4>
          <h4 className="text-lg max-w-[620px] ">
            You don’t have access to this area of application. Speak to your
            administrator to unblock this feature. You can go back to{" "}
            <span
              onClick={() => navigate(-1)}
              className="text-blue-500 font-extrabold cursor-pointer"
            >
              previous page
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
