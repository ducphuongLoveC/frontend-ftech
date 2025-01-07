import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, Grid, Paper, LinearProgress } from "@mui/material";
const CoursesInfo = ({ courses }) => (_jsxs(Box, { sx: { padding: "20px" }, children: [_jsxs(Typography, { variant: "h4", sx: { marginBottom: "20px", fontWeight: "bold" }, children: ["S\u1ED1 kh\u00F3a h\u1ECDc tham gia: ", courses.length] }), courses.length > 0 ? (_jsx(Grid, { container: true, spacing: 3, children: courses.map((course, index) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsxs(Paper, { sx: {
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            boxShadow: 6,
                            transform: "translateY(-5px)",
                        },
                    }, children: [_jsx(Typography, { variant: "h4", sx: { fontWeight: "bold", marginBottom: "15px" }, children: course.title || "Không có tiêu đề" }), _jsx(Box, { sx: {
                                position: "relative",
                                paddingBottom: "56.25%", // Tạo tỷ lệ 16:9 cho hình ảnh
                                overflow: "hidden",
                                borderRadius: "8px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                            }, children: _jsx("img", { src: course.thumbnail, alt: course.title, style: {
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                } }) }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: "bold" }, mt: 1, children: ["Ho\u00E0n th\u00E0nh ch\u01B0\u01A1ng: ", `${course.completedModules} / ${course.totalModules}`, ' '] }), _jsxs(Typography, { variant: "h5", sx: { fontWeight: "bold" }, mt: 1, children: ["Ho\u00E0n th\u00E0nh b\u00E0i h\u1ECDc: ", ` ${course.completedResources} / ${course.totalResources}`, ' '] }), _jsxs(Typography, { variant: "body2", sx: { marginBottom: "10px", fontWeight: "bold" }, mt: 1, children: ["Ti\u1EBFn \u0111\u1ED9 ho\u00E0n th\u00E0nh: ", `${course.progress || 0}%`] }), _jsx(LinearProgress, { variant: "determinate", value: course.progress || 0, sx: {
                                height: "10px",
                                borderRadius: "5px",
                                backgroundColor: "#e0e0e0", // Màu xám cho phần chưa hoàn thành
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: course.progress === 0
                                        ? "#e0e0e0" // Màu xám khi tiến độ 0%
                                        : "#76c7c0", // Màu xanh khi tiến độ > 0%
                                },
                            } })] }) }, index))) })) : (_jsx(Typography, { variant: "body1", sx: { marginTop: "20px" }, children: "T\u00E0i kho\u1EA3n n\u00E0y ch\u01B0a \u0111\u0103ng k\u00FD kh\u00F3a h\u1ECDc n\u00E0o." }))] }));
export default CoursesInfo;
