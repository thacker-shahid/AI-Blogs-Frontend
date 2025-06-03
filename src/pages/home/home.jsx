// import Hero from "./Hero";
import Blog from "../blogs/Blog";
import Hero from "../miniPages/Hero";

const Home = () => {
  return (
    <div className="container mx-auto p-8 mt-8 text-black dark:text-white dark:border-gray-600">
      <Hero />
      <Blog />
    </div>
  );
};

export default Home;
