import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user } = useSelector((state) => state.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
