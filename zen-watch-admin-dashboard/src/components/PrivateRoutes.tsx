import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoutes = () => {
  const user = useAppSelector((state) => state.app.user);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
