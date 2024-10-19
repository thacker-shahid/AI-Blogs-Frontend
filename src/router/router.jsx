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
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AddPost from "../pages/admin/post/AddPost";
import ManagePosts from "../pages/admin/post/ManagePosts";
import ManageUser from "../pages/admin/user/ManageUser";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/about-us", element: <About /> },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        { path: "/contact-us", element: <Contact /> },      
        { path: "/blogs/:id", element: <SinglBlog /> },   
        { path: "/login", element: <Login /> },   
        { path: "/register", element: <Register /> },   
        { 
          path: "/dashboard", 
          element: <AdminLayout />, 
          children:[
            {
              path: "", 
              element: < Dashboard/>
            },
            {
              path: "add-new-post", 
              element: <AddPost />
            },
            {
              path: "manage-items", 
              element: <ManagePosts />
            },
            {
              path: "users", 
              element: <ManageUser />
            }
          ] 
        },   
      ]
    },
]);

export default router;