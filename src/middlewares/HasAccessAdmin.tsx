import { RootState } from "@/store/reducer";
import { useSelector } from "react-redux";

interface HasAccessAdminProp {
  children: React.ReactNode;
}

const HasAccessAdmin: React.FC<HasAccessAdminProp> = ({ children }) => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  
  const roles = ["admin"];
  if (user && roles.includes(user.role)) {
    return <>{children}</>;
  }
  return (
    <center>
      <h1>401 Authorization Required</h1>
    </center>
  );
};

export default HasAccessAdmin;
