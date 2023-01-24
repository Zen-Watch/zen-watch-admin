import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const UnprivatePrivateRoute = () => {
  const status = useAppSelector((state) => state.app.status);
  const disconnected = (status === 'disconnected');
  return disconnected ? <Outlet /> : <Navigate to="/home" />;
};

export default UnprivatePrivateRoute;
