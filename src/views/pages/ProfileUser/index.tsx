

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { useUserCourses } from "@/api/useUserCourses";
import useQueryParams from "@/hooks/useQueryParams";
import { User } from "@/store/authReducer";
import { Box, Typography, Avatar, Paper, Link, Grid, Container, useMediaQuery } from "@mui/material";
import { PersonPinCircleRounded, CheckCircle } from "@mui/icons-material";
import Progress from "@/components/Progress";

const ProFile = () => {
  const query = useQueryParams();
  const userIdFromURL = query.get("id");
  const navigate = useNavigate();
  const { courses, coursesError } = useUserCourses(userIdFromURL);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:1100px)');

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userIdFromURL) {
        try {
          const response = await axiosInstance.get(`/api/user/${userIdFromURL}`);
          if (response.status === 200) {
            if (response.data.data) {
              setUser(response.data.data);
              setError(null);
            } else {
              setError("Không tìm thấy người dùng với ID này.");
            }
          } else {
            setError("Không tìm thấy người dùng với ID này.");
          }
        } catch (error) {
          setError("Lỗi khi lấy thông tin người dùng.");
        }
      }
    };
    fetchUserInfo();
  }, [userIdFromURL]);

  useEffect(() => {
    if (error) {
      navigate("/notfound");
    }
  }, [error, navigate]);

  if (!userIdFromURL) {
    return <Typography>ID không hợp lệ!</Typography>;
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Container>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            margin: "auto",
            width: "100%",
            height: isMobile ? 150 : 308,
            borderRadius: "0px 0px 20px 20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="/images/banner-user.png"
            alt="Banner"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: isMobile ? -50 : -80,
            left: isMobile ? 0 : -280,
          }}
        >
          <Avatar
            src={user?.profile_picture || "default-avatar.png"}
            alt="Avatar"
            sx={{
              width: isMobile ? 100 : 172,
              height: isMobile ? 100 : 172,
              borderRadius: "50%",
              border: "4px solid white",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              marginLeft: 2,
              fontSize: isMobile ? 20 : 30,
              fontWeight: "bold",
              color: "black",
              marginTop: isMobile ? 3 : 6,
            }}
          >
            {user?.name || "Tên người dùng"}
            {user?.role === "admin" && (
              <CheckCircle
                sx={{
                  fontSize: "var(--medium-icon)",
                  color: "primary.main",
                  ml: 1,
                }}
              />
            )}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ marginTop: isMobile ? 2 : 0 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 16, marginBottom: 1 }}>
                Giới thiệu
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">
                  Biệt danh: {user?.referring}
                </Typography>
                <PersonPinCircleRounded />
                <Typography variant="body2">
                  Thành viên của Ftech - Ngày tham gia:{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Chưa có thông tin"}
                </Typography>
              </Box>
            </Paper>

            <Paper
              sx={{
                marginTop: 2,
                padding: 2,
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: 16, marginBottom: 1 }}>
                Hoạt động gần đây
              </Typography>
              <Typography variant="body2">Chưa có hoạt động gần đây</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontSize: 16, marginBottom: 2 }}>
              Các khóa học đã tham gia
            </Typography>
            {coursesError && (
              <Typography color="error">{coursesError}</Typography>
            )}
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: "1px solid #ccc",
                    width: "100%",
                    margin: "20px 0px",
                    padding: "0px 0px 12px",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: isMobile ? 100 : 228,
                      height: isMobile ? 80 : 128,
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      <Link href="#">{course.title}</Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: truncateText(course.description, 70),
                      }}
                    />
                    <Typography variant="body2">
                      Tiến độ: {course.progress}%
                    </Typography>
                    <Progress value={course.progress || 0} />
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>Không có khóa học nào</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProFile;