import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" flex justify-center items-center bg-orange-50 flex-1 w-full border">
      <div className="">
        <div className="gif">
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div className="text-center mt-28">
          <h1 className="main-heading text-5xl font-extrabold">
            This page is gone.
          </h1>
          <p className="text-2xl leading-5 my-10">
            ...maybe the page you're looking for is not found or never existed.
          </p>

          <Link
            to="/"
            className="bg-orange-500 pl-10 pr-5 py-4 rounded-full text-white"
          >
            Back to home &nbsp;👈
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
