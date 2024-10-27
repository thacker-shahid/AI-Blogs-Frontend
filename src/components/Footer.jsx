import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avatarImg from "../assets/avatarImg.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

export default function Footer() {
  //   const navList = [
  //     { name: "Home", path: "/" },
  //     { name: "About Us", path: "/about-us" },
  //     { name: "Privacy Policy", path: "/privacy-policy" },
  //     { name: "Contact Us", path: "/contact-us" },
  //   ];

  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  //   const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  //   };

  //   const { user } = useSelector((state) => state.auth);
  //   const [logoutUser] = useLogoutUserMutation();
  //   const dispatch = useDispatch();

  //   const handleLogout = async () => {
  //     try {
  //       await logoutUser().unwrap();
  //       dispatch(logout());
  //     } catch (err) {
  //       console.error("Failed to log out: ", err);
  //     }
  //   };

  return (
    <>
      <footer className="bg-white shadow mt-8 dark:bg-gray-950">
        <div className="w-full mx-auto max-w-screen-xl p-4 sm:flex sm:items-center sm:justify-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              TrendinGlobes™
            </a>
            . All Rights Reserved.
          </span>
          {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul> */}
        </div>
      </footer>
    </>
  );
}
