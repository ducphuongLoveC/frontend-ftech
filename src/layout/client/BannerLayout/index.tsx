import { useTheme, Theme, useMediaQuery, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SideBar from "../MainLayout/SideBar";
import Carousel from "@/components/Carousel";
import Header from "../MainLayout/Header";
import Footer from "../MainLayout/Footer";
import axiosInstance from "@/api/axiosInstance";
import { Outlet } from "react-router-dom";

interface CarouselItem {
  _id: string;
  path: string;
  image: string;
  background: string;
  title: string;
  description: string;
}

const BannerLayout: React.FC = () => {
  const theme: Theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down("md"));

  const {
    data: carousels,
    isLoading,
    isError,
  } = useQuery<CarouselItem[], Error>({
    queryKey: ["carousels"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/carousel");
      return response.data.data;
    },
  });

  if (isError) {
    console.error("Failed to fetch carousels");
  }

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
              xl: "1420px",
            },
            [`@media (min-width:1800px)`]: {
              margin: "auto",
            },

            px: downMD ? 2 : 0,
          }}
        >
          {isLoading ? (
            "loading..."
          ) : (
            <Carousel dot auto time={15000} sliders={carousels || []} />
          )}
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
