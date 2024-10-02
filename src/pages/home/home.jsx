import Hero from "./Hero";
import Blog from "../blogs/Blog";

const Home = () => {
  return (
    <div className="bg-white text-primary container mx-auto mt-8 p-8 ">
      <Hero /> {/* For hero section see video from 5:36:56 to 5:52:22 */}
      <Blog />
    </div>
  );
};

export default Home;
