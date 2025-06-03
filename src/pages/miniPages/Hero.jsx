import { Link } from "react-router-dom";
import image from "../../assets/hero page image.jpeg";
export default function Hero() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Welcome to <span className="text-blue-700">TrendinGlobes</span>{" "}
                one place for trending technology.
              </h1>
              <div className="w-20 h-2 bg-blue-700 my-4"></div>
              <p className="text-xl mb-10">
                We are committed to provide you the best of trending, with a
                focus on reliability and tech. We strive to turn our passion for
                trending into a thriving website.
              </p>
              <Link to="/about-us">
                <button className="border bg-[#1E73BE] text-2xl font-medium px-4 py-2 rounded shadow text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900">
                  Learn More
                </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
      <img
        src={image}
        alt="TrendinGlobes"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
}
