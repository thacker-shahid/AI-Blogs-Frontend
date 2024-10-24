import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  // const token = document.cookie;
  const location = useLocation();
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}
