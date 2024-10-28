import { NavLink } from "react-router-dom";
import avatarImg from "../../assets/avatarImg.png";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { Toaster, toast } from "sonner";

export default function AdminNavigation() {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully.", { action: { label: "X" } });
    } catch (err) {
      console.error("Failed to log out: ", err);
      toast.error("Failed to log out. Please try again.", {
        action: { label: "X" },
      });
    }
  };

  return (
    <div className="space-y-5 p-8 bg-white md:h-[calc(100vh-86px)] flex flex-col justify-between ">
      <Toaster richColors position="top-right" />
      <div>
        {/* Header part */}
        <div className="mb-5">
          <img className="size-20" src={avatarImg} alt="avatar" />
          <p className="font-semibold">Admin</p>
        </div>
        <hr />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to={"/dashboard"}
              end
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/add-new-post"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-items"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Manage Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-comments"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Comments
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/users"}
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : "text-black"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer part */}
      <div className="mb-3">
        <hr className="mb-8" />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
