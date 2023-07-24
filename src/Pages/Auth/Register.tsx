import { useNavigate } from "react-router-dom";
import MainSpinner from "../../Common/MainSpinner";

import { useState } from "react";
import inputHelper from "../../Helper/inputHelper";
import { apiResponse } from "../../interfaces";
import { useRegisterUserMutation } from "../../Apis/authApi";
import { toastNotify } from "../../Helper";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    // role: "",
    name: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      role: "customer",
      name: userInput.name,
    });
    if (response.data) {
      toastNotify("Registeration successful! Please login to continue.");
      navigate("/login");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex-col bg-gray-100 flex w-full justify-center items-center ">
      {loading && (
        <div className="flex-1 w-full flex justify-center items-center">
          <MainSpinner />
        </div>
      )}
      {/* onSubmit={handleSubmit} */}
      {!loading && (
        <>
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Sushi Express
          </a>
          <div className="w-full bg-white rounded-lg shadow max-w-[360px] ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Register
              </h1>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                {/* <h1 className="mt-5">Register</h1> */}
                <div className="mt-5 w-full">
                  <div className="w-full mt-4">
                    <label htmlFor="userName">email</label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="john@gmail.com"
                      required
                      name="userName"
                      value={userInput.userName}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div className=" w-full mt-4">
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter Name"
                      required
                      name="name"
                      value={userInput.name}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div className="w-full mt-4">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Enter Password"
                      required
                      name="password"
                      value={userInput.password}
                      onChange={handleUserInput}
                    />
                  </div>
                  {/* <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                    <select
                      className="form-control form-select"
                      required
                      value={userInput.role}
                      name="role"
                      onChange={handleUserInput}
                    >
                      <option value="">--Select Role--</option>
                      <option value={`${SD_Roles.CUTOMER}`}>Customer</option>
                      <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                    </select>
                  </div> */}
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className=" bg-blue-600 text-white w-full px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    Register
                  </button>
                </div>
              </form>
              {/* <form
                className="space-y-4 md:space-y-6"
                method="post"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="userName"
                    value={userInput.userName}
                    onChange={handleUserInput}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    value={userInput.password}
                    onChange={handleUserInput}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                {error && <p className=" text-red-400 ">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </p>
              </form> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
