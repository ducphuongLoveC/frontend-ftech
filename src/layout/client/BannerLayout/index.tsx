import { useTheme, Theme, useMediaQuery, Box } from "@mui/material";
import { useEffect, useState } from "react";

import SideBar from "../MainLayout/SideBar";
import Carousel from "@/components/Carousel";
import Header from "../MainLayout/Header";
import Footer from "../MainLayout/Footer";
import axiosInstance from "@/api/axiosInstance";

// interface BannerLayoutProp {
//   children: React.ReactNode;
// }

interface CarouselItem {
  _id: string;
  path: string;
  image: string;
  background: string;
  title: string;
  description: string;
}
import { Outlet } from "react-router-dom";
// const BannerLayout: React.FC<BannerLayoutProp> = ({ children }) => {

const BannerLayout: React.FC = () => {
  const theme: Theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const [carousels, setCarousels] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axiosInstance.get("/api/carousel");
        setCarousels(response.data.data);
      } catch (error) {
        console.error("Failed to fetch carousels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  return (
    <Box sx={{ background: theme.palette.background.paper }}>
      <Header />
      <Box sx={{ display: "flex", background: theme.palette.background.paper }}>
        <SideBar />
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "85%",
              md: "80%",
              lg: "87%",
              xl: "1330px",
            },
            "@media (min-width:1500px)": {
              margin: "auto",
            },
            px: downMD ? 2 : 0,
          }}
        >
          {loading ? (
            "loading..."
          ) : (
            <Carousel dot auto time={15000} sliders={carousels} />
          )}
          {/* <Box mt={4}>{children}</Box> */}
          <Box mt={4}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default BannerLayout;
