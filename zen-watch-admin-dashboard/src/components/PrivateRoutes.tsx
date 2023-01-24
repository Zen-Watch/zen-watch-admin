import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoutes = () => {
  const status = useAppSelector((state) => state.app.status);
  const connected = (status === 'connected');
  return connected ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
