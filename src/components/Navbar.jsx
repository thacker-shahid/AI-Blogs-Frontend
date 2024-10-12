import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avatarImg from "../assets/avatarImg.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

export default function Navbar() {
  const navList = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Failed to log out: ", err);
    }
  };

  return (
    <>
      <header className="bg-white border">
        <nav className="container mx-auto flex justify-between px-5">
          <a href="/">
            <img src="./logo.png" alt="Logo" className="h-16 w-24" />
          </a>
          <ul className="sm:flex hidden items-center gap-8">
            {navList.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={`${item.path}`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {user && user.role === "user" && (
              <li className="flex items-center gap-3">
                <img src={avatarImg} alt="AvatarImage" className="size-8" />
                <button
                  onClick={handleLogout}
                  className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                >
                  Logout
                </button>
              </li>
            )}

            {user && user.role === "admin" && (
              <li className="flex items-center gap-3">
                <img src={avatarImg} alt="AvatarImage" className="size-8" />
                <Link to="/dashboard">
                  <button className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">
                    Dashboard
                  </button>
                </Link>
              </li>
            )}
            {user ? (
              <></>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>

          {/* Toggle Menu Button */}
          <div className="flex items-center sm:hidden">
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
            <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm">
              {navList.map((item) => (
                <li key={item.name} className="mt-5 px-4">
                  <NavLink
                    to={`${item.path}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </header>
    </>
  );
}
