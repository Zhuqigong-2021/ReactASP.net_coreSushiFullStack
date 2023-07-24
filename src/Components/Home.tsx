import { useNavigate } from "react-router-dom";
import hero from "../assets/images/hero.png";
const Home = () => {
  const navigate = useNavigate();
  return (
    <section className=" bg-orange-50 flex flex-1 pt-28 pb-20 top-0 left-0 right-0 bottom-0 overflow-hidden  no-scrollbar max-h-screen items-center  ">
      <div className="hero max-w-[110rem] mx-auto border-red-600  pt-36 pb-16  px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        <div className="hero-text-box ">
          <h1 className="heading-primary max-w-[46rem] text-5xl font-extrabold text-[rgba(0,0,0,0.8)] mb-20">
            A healthy meal delivered to your door, every single day
          </h1>
          <p className="hero-description text-[1.6rem] mb-[4.8rem] leading-14 max-w-[46rem]">
            The smart 365-days-per-year food subscription that will make you eat
            healthy again. Tailored to your personal tastes and nutritional
            needs.
          </p>
          <button
            // to="/order"
            onClick={() => navigate("/order")}
            className="z-50 px-5 py-3 text-xl bg-orange-400 text-white rounded-lg font-semibold mr-0 md:mr-4 block md:inline lg:inline text-center md:text-left lg:text-left"
          >
            Start eating well
          </button>
          <a
            href="#"
            className=" px-6 py-4 text-xl bg-white rounded-lg font-semibold block md:inline lg:inline mt-4 md:mt-0 lg:mt-0 text-center md:text-left lg:text-left"
          >
            Learn more &darr;
          </a>
          <div className="delivered-meals mt-[4.8rem] flex flex-col md:flex-row lg:flex-row items-center ">
            <div className="delivered-imgs flex">
              <img
                src="https://randomuser.me/portraits/men/1.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white"
              />
              <img
                src="https://randomuser.me/portraits/men/45.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white -ml-4"
              />
              <img
                src="https://randomuser.me/portraits/women/6.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white -ml-4"
              />
              <img
                src="https://randomuser.me/portraits/men/6.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white -ml-4"
              />
              <img
                src="https://randomuser.me/portraits/women/1.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white -ml-4"
              />
              <img
                src="https://randomuser.me/portraits/women/7.jpg"
                alt="Customer photo"
                className="w-12 h-12 rounded-full border-4 border-white -ml-4"
              />
            </div>
            <p className=" text-lg font-extrabold ml-4">
              <span className="text-orange-600 ">250,000+</span> meals delivered
              last year!
            </p>
          </div>
        </div>
        <div className="hero-img-box ">
          <img
            src={hero}
            className="hero-img "
            alt="Woman enjoying food, meals in storage container, and food bowls on a table"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
