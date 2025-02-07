import { useTheme, Theme, Box } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
// interface MainLayoutProp {
//   children: React.ReactNode;
// }

// const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
const MainLayout: React.FC = () => {

  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          background: theme.palette.background.paper,
        }}
      >
        <SideBar />
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
              md: "85%",
              lg: "87%",
              xl: "1350px",
            },
            margin: {
              xl: "auto",
            },
          }}
        >
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
