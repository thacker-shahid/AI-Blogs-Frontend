import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avatarImg from "../assets/avatarImg.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import { Toaster, toast } from "sonner";
import logo from "../assets/logo.png";
import { setDarkMode } from "../redux/features/darkmode/darkModeSlice";

export default function Navbar(toggle) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navList = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!", { action: { label: "X" } });
    } catch (err) {
      console.error("Failed to log out: ", err);
      toast.error("Failed to log out. Please try again.", {
        action: { label: "X" },
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="border-b bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600 mt-2">
        <Toaster richColors position="top-right" />
        <nav className="container mx-auto flex justify-between px-5">
          <a href="/">
            <img
              src={logo}
              alt="Logo"
              className="mb-2"
              width="200px"
              height="50px"
            />
          </a>
          <ul className="sm:flex hidden items-center gap-8">
            {navList.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`${item.path}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <button
              onClick={() => dispatch(setDarkMode())}
              className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {user && user.role === "user" && (
              <li className="flex items-center gap-3">
                <img src={avatarImg} alt="AvatarImage" className="size-8" />
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                >
                  Logout
                </button>
              </li>
            )}

            {user && user.role === "admin" && (
              <li className="flex items-center gap-3">
                <img src={avatarImg} alt="AvatarImage" className="size-8" />
                <Link to="/dashboard">
                  <button className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md ">
                    Dashboard
                  </button>
                </Link>
              </li>
            )}
            {user ? (
              <></>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>

          {/* Toggle Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => dispatch(setDarkMode())}
              className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-8 rounded-md"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={toggleMenu}
              className="flex items-center bg-primary bg-[#fafafa] px-3 py-4 rounded text-sm text-gray-500 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <IoCloseSharp className="size-6" />
              ) : (
                <GiHamburgerMenu className="size-6" />
              )}
            </button>
          </div>

          {/* Toggle Menu Items */}
          {isMenuOpen && (
            <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b shadow-sm  bg-white border text-black dark:text-white dark:border-gray-600 dark:bg-gray-900 font-medium py-3 rounded-md">
              {navList.map((item, index) => (
                <li key={index} className="mt-5 px-4">
                  <NavLink
                    to={`${item.path}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}

              {user && user.role === "user" && (
                <li className="mt-5 px-4">
                  <button
                    onClick={handleLogout}
                    className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md w-1/2"
                  >
                    Logout
                  </button>
                  {/* <button
                    onClick={() => dispatch(setDarkMode())}
                    className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button> */}
                </li>
              )}

              {user && user.role === "admin" && (
                <li className="mt-5 px-4">
                  <Link to="/dashboard">
                    <button className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md w-1/2">
                      Dashboard
                    </button>
                  </Link>
                  {/* <button
                    onClick={() => dispatch(setDarkMode())}
                    className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button> */}
                </li>
              )}
              {user ? (
                <></>
              ) : (
                <li className="mt-5 px-4">
                  <NavLink
                    to="/login"
                    className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                  >
                    Login
                  </NavLink>
                  {/* <button
                    onClick={() => dispatch(setDarkMode())}
                    className="bg-blue-500 border text-white dark:text-white dark:border-gray-600 hover:bg-indigo-500 dark:bg-gray-900 font-medium py-2 px-4 rounded-md"
                  >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button> */}
                </li>
              )}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}
