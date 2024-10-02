// import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import About from "../pages/miniPages/About";
import Contact from "../pages/miniPages/ContactUs";
import PrivacyPolicy from "../pages/miniPages/Privacy";
import SinglBlog from "../pages/blogs/singleBlog/SingleBlog";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/about-us", element: <About /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/contact-us", element: <Contact /> },      
        { path: "/blogs/:id", element: <SinglBlog /> }     
      ]
    },
]);

export default router;