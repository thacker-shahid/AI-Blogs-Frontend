import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminNavigation from "./AdminNaviagation";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user || !user.role == "admin") {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start ">
      <header className="lg:w-1/5 sm: 2/5 w-full">
        <AdminNavigation />
      </header>
      <main className="p-8 bg-white w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
