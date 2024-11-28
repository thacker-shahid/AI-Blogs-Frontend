// import Hero from "./Hero";
import Blog from "../blogs/Blog";
import Hero from "../miniPages/Hero";

const Home = () => {
  return (
    <div className="bg-white text-primary container mx-auto mt-8 p-8 ">
      <Hero />
      <Blog />
    </div>
  );
};

export default Home;
