// import React, { useEffect, useMemo, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import {
//   Avatar,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   useTheme,
// } from '@mui/material';
// import useUsers from '@/api/useUsers';
// import useCourses from './api/useCourses';
// import { getOrders } from '@/api/OrderApi';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface Order {
//   _id: object;
//   user_id: object;
//   course_id: object;
//   payment_method: string;
//   amount: number;
//   createdAt: string;
// }

// const Dashboard: React.FC = () => {
//   const theme = useTheme();
//   const { rows: users } = useUsers();
//   const { courses } = useCourses();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
//   const [dailyRevenue, setDailyRevenue] = useState<number>(0);
//   const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
//   const [totalRevenue, setTotalRevenue] = useState<number>(0);
//   const [chartData, setChartData] = useState<{ day: string; value: number }[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const data = await getOrders();
//         setOrders(data);
//       } catch (error: any) {
//         console.error('Error fetching orders:', error);
//         setError('Failed to fetch orders');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     const filteredOrders = orders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
//     });

//     // Tạo danh sách tất cả các ngày trong tháng
//     const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
//     const allDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));

//     // Nhóm doanh số theo ngày
//     const groupedData = filteredOrders.reduce((acc: { [key: string]: number }, order) => {
//       const orderDate = new Date(order.createdAt);
//       const day = orderDate.getDate().toString().padStart(2, '0');
//       acc[day] = (acc[day] || 0) + order.amount;
//       return acc;
//     }, {});

//     // Tạo dữ liệu cho tất cả các ngày trong tháng, nếu không có đơn hàng thì gán giá trị 0
//     const formattedData = allDays.map((day) => ({
//       day,
//       value: groupedData[day] || 0,
//     }));

//     setChartData(formattedData);
//   }, [orders, selectedMonth, selectedYear]);

//   useEffect(() => {
//     calculateRevenues();
//   }, [orders, selectedDate, selectedMonth, selectedYear]);

//   const calculateRevenues = () => {
//     const monthlyOrders = orders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
//     });

//     const dailyOrders = orders.filter((order) => {
//       const orderDate = new Date(order.createdAt);
//       return (
//         orderDate.getDate() === selectedDate.getDate() &&
//         orderDate.getMonth() === selectedDate.getMonth() &&
//         orderDate.getFullYear() === selectedDate.getFullYear()
//       );
//     });

//     const total = orders.reduce((acc, order) => acc + order.amount, 0);
//     const monthly = monthlyOrders.reduce((acc, order) => acc + order.amount, 0);
//     const daily = dailyOrders.reduce((acc, order) => acc + order.amount, 0);

//     setTotalRevenue(total);
//     setMonthlyRevenue(monthly);
//     setDailyRevenue(daily);
//   };

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedDate(new Date(event.target.value));
//   };

//   const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMonth(Number(event.target.value));
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedYear(Number(event.target.value));
//   };

//   const data = {
//     labels: chartData.map((item) => `${selectedYear}-${selectedMonth + 1}-${item.day}`),
//     datasets: [
//       {
//         label: 'Doanh số',
//         data: chartData.map((item) => item.value),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   const ordersSorted = useMemo(() => {
//     const merged = orders.reduce((acc: any, o: any) => {
//       const user: any = acc.find((item: any) => item.user_id._id === o.user_id._id);
//       if (user) {
//         user.amount += o.amount;
//       } else {
//         acc.push({ ...o });
//       }
//       return acc;
//     }, []);

//     return merged.sort((a: any, b: any) => b.amount - a.amount);
//   }, [orders]);

//   const top10Courses = [...courses].sort((a, b) => b.enrollment_count - a.enrollment_count).slice(0, 10);

//   if (loading) {
//     return <p>Loading ...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="tw-container tw-mx-auto tw-px-4">
//       <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
//         <h1 className="tw-text-xl tw-font-semibold">Bảng điều khiển</h1>
//         <button style={{ background: theme.palette.background.default }} className="tw-py-2 tw-px-4">
//           Bảng điều khiển
//         </button>
//       </div>

//       <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-3">
//         <div className="md:tw-col-span-3">
//           <div className="tw-p-5" style={{ background: theme.palette.background.default }}>
//             <div>
//               <h2 className="tw-text-lg tw-font-semibold">Số tiền</h2>

//               <div className="mb-2">
//                 <select id="month" value={selectedMonth} onChange={handleMonthChange}>
//                   {Array.from({ length: 12 }, (_, i) => (
//                     <option key={i} value={i}>
//                       {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                     </option>
//                   ))}
//                 </select>

//                 <label htmlFor="year" className="ml-4 mr-2">
//                   Năm:
//                 </label>
//                 <select id="year" value={selectedYear} onChange={handleYearChange}>
//                   {Array.from({ length: 5 }, (_, i) => (
//                     <option key={i} value={new Date().getFullYear() - i}>
//                       {new Date().getFullYear() - i}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <Bar data={data} options={options} />
//           </div>

//           {/* <div
//             style={{ background: theme.palette.background.default }}
//             className="tw-h-20 tw-flex tw-justify-between tw-mt-4 tw-p-4 tw-shadow-md"
//           >
//             <div>
//               <p className="tw-text-xs md:tw-text-base tw-mb-1">Tải xuống báo cáo thống kê thu nhập của bạn</p>
//               <p className="tw-text-[10px] md:tw-text-xs">Thống kê tài chính khóa học</p>
//             </div>
//             <button className="tw-bg-violet-500 tw-text-white tw-py-2 tw-px-4">Tải xuống</button>
//           </div> */}
//         </div>

//         <div style={{ background: theme.palette.background.default }} className="tw-shadow-md tw-relative">
//           <div className="tw-flex tw-justify-between tw-px-4">
//             <h3 className="tw-text-lg tw-font-semibold">Học viên</h3>
//             {/* <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p> */}
//           </div>
//           <div className="tw-text-[90px] tw-text-white tw-bg-violet-500 tw-rounded-full tw-h-[200px] tw-w-[200px] tw-flex tw-items-center tw-justify-center tw-mx-auto tw-my-10">
//             {users.length}
//           </div>
//           <div className="tw-bg-black tw-text-white tw-h-[25%] tw-w-[100%] lg:tw-absolute tw-bottom-0 tw-p-4">
//             <div className="md:tw-mt-3">
//               <p className="tw-text-[#AAC8C6] tw-font-medium tw-text-lg tw-mb-2">
//                 Doanh thu tháng {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'numeric' })}
//               </p>
//               <p className="tw-font-semibold tw-text-3xl">{monthlyRevenue.toLocaleString('vi-VN')} VNĐ</p>
//               <p className="tw-text-green-600">Doanh thu trong cả một tháng</p>
//             </div>
//           </div>
//         </div>
//         <div className=" md:tw-col-span-4 ">
//           <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
//             <div className="md:tw-col-span-3 ">
//               <div className="tw-mb-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3  ">
//                 <div style={{ background: theme.palette.background.default }} className=" tw-px-4 tw-shadow-md ">
//                   <div className="tw-flex tw-justify-between">
//                     <h3 className="tw-text-base tw-font-semibold">Doanh thu ngày:</h3>
//                     <div className="tw-mt-5">
//                       <input
//                         id="date"
//                         type="date"
//                         value={selectedDate.toISOString().split('T')[0]}
//                         onChange={handleDateChange}
//                       />
//                     </div>
//                   </div>
//                   <p className="tw-text-2xl tw-text-center tw-font-bold">{dailyRevenue.toLocaleString('vi-VN')} VNĐ</p>
//                 </div>
//                 <div style={{ background: theme.palette.background.default }} className=" tw-px-4 tw-shadow-md  ">
//                   <h3 className="tw-text-base tw-font-semibold">Tổng danh thu:</h3>
//                   <p className="tw-text-2xl tw-pb-10 tw-mt-5 tw-text-center tw-font-bold">
//                     {totalRevenue.toLocaleString('vi-VN')} VNĐ
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={{ background: theme.palette.background.default }} className="md:tw-col-span-2 tw-shadow-md">
//           <div className="tw-flex tw-justify-between tw-px-4">
//             <h3 className="tw-text-lg tw-font-semibold">Top 10 khoá học yêu thích</h3>
//           </div>
//           <TableContainer component={Paper}>
//             <Table size="small" aria-label="top 10 courses table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>STT</TableCell>
//                   <TableCell>Ảnh</TableCell>
//                   <TableCell>Tên khoá học</TableCell>
//                   <TableCell align="right">Lượt đăng ký</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {top10Courses.map((course, index) => (
//                   <TableRow key={course._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>
//                       <Avatar variant="square" src={course.thumbnail} alt="Course" sx={{ width: 40, height: 28 }} />
//                     </TableCell>
//                     <TableCell>{course.title}</TableCell>
//                     <TableCell align="right">{course.enrollment_count}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//         <div
//           style={{ background: theme.palette.background.default }}
//           className="tw-shadow-md tw-overflow-hidden md:tw-col-span-2"
//         >
//           <div className="tw-flex tw-justify-between tw-px-4">
//             <h3 className="tw-text-lg tw-font-semibold">Top 10 chiến thần chi tiêu</h3>
//             {/* <p className="tw-mt-6 tw-text-xs tw-text-gray-400">Xem thêm</p> */}
//           </div>
//           <TableContainer component={Paper} sx={{ px: 3 }}>
//             <Table size="small" aria-label="a dense table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>STT</TableCell>
//                   <TableCell>Tên học viên</TableCell>
//                   <TableCell align="right">Số tiền chi tiêu</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {ordersSorted.map((o: any, index: number) => (
//                   <TableRow key={index}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{o.user_id.name}</TableCell>
//                     <TableCell align="right">{o.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import useUsers from '@/api/useUsers';
import useCourses from './api/useCourses';
import { getOrders } from '@/api/OrderApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Order {
  _id: object;
  user_id: object;
  course_id: object;
  payment_method: string;
  amount: number;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { rows: users } = useUsers();
  const { courses } = useCourses();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [dailyRevenue, setDailyRevenue] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [chartData, setChartData] = useState<{ day: string; value: number }[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
    });

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const groupedData = filteredOrders.reduce((acc: { [key: string]: number }, order) => {
      const orderDate = new Date(order.createdAt);
      const day = orderDate.getDate().toString().padStart(2, '0');
      acc[day] = (acc[day] || 0) + order.amount;
      return acc;
    }, {});

    const formattedData = allDays.map((day) => ({
      day,
      value: groupedData[day] || 0,
    }));

    setChartData(formattedData);
  }, [orders, selectedMonth, selectedYear]);

  useEffect(() => {
    calculateRevenues();
  }, [orders, selectedDate, selectedMonth, selectedYear]);

  const calculateRevenues = () => {
    const monthlyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
    });

    const dailyOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getDate() === selectedDate.getDate() &&
        orderDate.getMonth() === selectedDate.getMonth() &&
        orderDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    const total = orders.reduce((acc, order) => acc + order.amount, 0);
    const monthly = monthlyOrders.reduce((acc, order) => acc + order.amount, 0);
    const daily = dailyOrders.reduce((acc, order) => acc + order.amount, 0);

    setTotalRevenue(total);
    setMonthlyRevenue(monthly);
    setDailyRevenue(daily);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleMonthChange = (event: any) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(Number(event.target.value));
  };

  const data = {
    labels: chartData.map((item) => `${selectedYear}-${selectedMonth + 1}-${item.day}`),
    datasets: [
      {
        label: 'Doanh số',
        data: chartData.map((item) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const ordersSorted = useMemo(() => {
    const merged = orders.reduce((acc: any, o: any) => {
      const user: any = acc.find((item: any) => item.user_id._id === o.user_id._id);
      if (user) {
        user.amount += o.amount;
      } else {
        acc.push({ ...o });
      }
      return acc;
    }, []);

    return merged.sort((a: any, b: any) => b.amount - a.amount);
  }, [orders]);

  const top10Courses = [...courses].sort((a, b) => b.enrollment_count - a.enrollment_count).slice(0, 10);

  if (loading) {
    return <Typography>Loading ...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
              <FormControl sx={{ mr: 2 }}>
                <InputLabel id="month-label">Tháng</InputLabel>
                <Select
                  labelId="month-label"
                  id="month"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Tháng"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <MenuItem key={i} value={i}>
                      {new Date(0, i).toLocaleString('default', {
                        month: 'long',
                      })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="year-label">Năm</InputLabel>
                <Select labelId="year-label" id="year" value={selectedYear} onChange={handleYearChange} label="Năm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <MenuItem key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Bar data={data} options={options} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Paper sx={{ p: 3, position: 'relative', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Học viên</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: 'violet.500',

                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  my: 3,
                  fontSize: '90px',
                  height: '100%',
                }}
              >
                {users.length}
              </Box>
            </Paper>
            <Box
              sx={{
                bgcolor: 'black',
                color: 'white',
                p: 2,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Typography variant="body1" sx={{ color: '#AAC8C6', fontWeight: 'medium', mb: 1 }}>
                Doanh thu tháng {new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'numeric' })}
              </Typography>
              <Typography variant="h4" color={theme.palette.text.primary} sx={{ fontWeight: 'bold' }}>
                {monthlyRevenue.toLocaleString('vi-VN')} VNĐ
              </Typography>
              <Typography variant="body2" sx={{ color: 'green.600' }}>
                Doanh thu trong cả một tháng
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Doanh thu ngày:</Typography>
                  <input
                    id="date"
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                  />
                </Box>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                  {dailyRevenue.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Tổng danh thu:</Typography>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', pb: 5 }}>
                  {totalRevenue.toLocaleString('vi-VN')} VNĐ
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Top 10 khoá học yêu thích</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Tên khoá học</TableCell>
                    <TableCell align="right">Lượt đăng ký</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {top10Courses.map((course, index) => (
                    <TableRow key={course._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar variant="square" src={course.thumbnail} alt="Course" sx={{ width: 40, height: 28 }} />
                      </TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell align="right">{course.enrollment_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Top 10 chiến thần chi tiêu</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Tên học viên</TableCell>
                    <TableCell align="right">Số tiền chi tiêu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersSorted.map((o: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{o.user_id.name}</TableCell>
                      <TableCell align="right">{o.amount.toLocaleString('vi-VN')} VNĐ</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
