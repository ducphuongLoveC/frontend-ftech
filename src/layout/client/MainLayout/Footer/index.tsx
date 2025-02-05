import React from "react";
import { Link } from "react-router-dom";
import {
  useTheme,
  Typography,
  Box,
} from "@mui/material";

// ===============================|| FOOTER ||=============================== //

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        marginTop: "20px",
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flexBasis: { xs: "100%", md: "33%" }, padding: "16px" }}>
        
          <div>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.text.secondary,
                marginTop: 4,
                marginBottom: 3,
              }}
            >
              Liên hệ với chúng tôi
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              +0123456789
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              email.com
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              9AM- 5PM, Monday - Friday
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Nhà số 10, 379 Xuân Phương, Nam Từ Liêm, Hà Nội
            </Typography>
          </div>
        </Box>

        <Box sx={{ flexBasis: { xs: "100%", md: "33%" }, padding: "16px" }}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.secondary,
              marginTop: 4,
              marginBottom: 3,
            }}
          >
            Các liên kết khác
          </Typography>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
            {[
              "Start here",
              "Blogs",
              "About us",
              "Contact Us",
              "Career",
              "Courses",
            ].map((link, index) => (
              <li key={index}>
                <Link
                  to="/"
                  style={{
                    color: theme.palette.text.primary,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ fontSize: "12px", marginRight: "8px" }}
                  />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ flexBasis: { xs: "100%", md: "33%" }, padding: "16px" }}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.secondary,
              marginTop: 4,
              marginBottom: 3,
            }}
          >
            Sản phẩm
          </Typography>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
            {[
              "Start here",
              "Blogs",
              "About us",
              "Contact Us",
              "Career",
              "Courses",
            ].map((info, index) => (
              <li key={index}>
                <Link
                  to="/"
                  style={{
                    color: theme.palette.text.primary,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ fontSize: "12px", marginRight: "8px" }}
                  />
                  {info}
                </Link>
              </li>
            ))}
          </ul>
        </Box>

        <Box sx={{ flexBasis: { xs: "100%", md: "33%" }, padding: "16px" }}>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.text.secondary,
              marginTop: 4,
             
            }}
          >
            Mạng xã hội
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary, marginBottom: 4 }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut odit
            magnam officia sequi aliquid facere corporis dolorem beatae? Dolore
            pariatur illo odio nulla atque quibusdam dicta ut tempore, suscipit
            est.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
