import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { useUserCourses } from "@/api/useUserCourses";
import useQueryParams from "@/hooks/useQueryParams";
import { User } from "@/store/authReducer";
import { Box, Typography, Avatar, Paper, Link } from "@mui/material";
import { PersonPinCircleRounded, CheckCircle } from "@mui/icons-material";
import Progress from "@/components/Progress";

const ProFile = () => {
  const query = useQueryParams();
  const userIdFromURL = query.get("id");
  const navigate = useNavigate();
  const { courses, coursesError } = useUserCourses(userIdFromURL);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userIdFromURL) {
        try {
          const response = await axiosInstance.get(
            `/api/user/${userIdFromURL}`
          );
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
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          margin: "auto",
          width: 1100,
          height: 308,
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
          top: -80,
          left: -280,
        }}
      >
        <Avatar
          src={user?.profile_picture || "default-avatar.png"}
          alt="Avatar"
          sx={{
            width: 172,
            height: 172,
            borderRadius: "50%",
            border: "4px solid white",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            marginLeft: 2,
            fontSize: 30,
            fontWeight: "bold",
            color: "black",
            marginTop: 6,
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

      <Box
        sx={{
          border: "0px solid #ccc",
          width: 1100,
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          margin: "-50px auto",
          padding: "0px 24px",
          gap: 2,
        }}
      >
        <Box sx={{ width: "40%", padding: "0px 12px" }}>
          <Paper
            sx={{
              border: "0px solid #ccc",
              width: "100%",
              marginBottom: 2,
              padding: "18px 14px",
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
              border: "0px solid #ccc",
              width: "100%",
              marginBottom: 2,
              padding: "18px 14px",
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
        </Box>

        <Box sx={{ width: "60%", padding: "0 14px" }}>
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
                    width: 228,
                    height: 128,
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
        </Box>
      </Box>
    </Box>
  );
};

export default ProFile;
