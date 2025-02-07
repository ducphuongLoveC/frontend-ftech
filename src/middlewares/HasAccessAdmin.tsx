import { RootState } from "@/store/reducer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface HasAccessAdminProp {
  children: React.ReactNode;
}

const HasAccessAdmin: React.FC<HasAccessAdminProp> = ({ children }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const roles = ["admin"];
  if (!user && !roles.includes(user.role))
    return <Navigate to={"/auth/login"} />;
  return <>{children}</>;
};

export default HasAccessAdmin;
