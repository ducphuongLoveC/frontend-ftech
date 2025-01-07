import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, } from '@mui/material';
import useUsers from '@/api/useUsers';
import useCourses from './api/useCourses';
import { getOrders } from '@/api/OrderApi';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Dashboard = () => {
    const theme = useTheme();
    const { rows: users } = useUsers();
    const { courses } = useCourses();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [dailyRevenue, setDailyRevenue] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await getOrders();
                setOrders(data);
            }
            catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            }
            finally {
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
        // Tạo danh sách tất cả các ngày trong tháng
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const allDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
        // Nhóm doanh số theo ngày
        const groupedData = filteredOrders.reduce((acc, order) => {
            const orderDate = new Date(order.createdAt);
            const day = orderDate.getDate().toString().padStart(2, '0');
            acc[day] = (acc[day] || 0) + order.amount;
            return acc;
        }, {});
        // Tạo dữ liệu cho tất cả các ngày trong tháng, nếu không có đơn hàng thì gán giá trị 0
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
            return (orderDate.getDate() === selectedDate.getDate() &&
                orderDate.getMonth() === selectedDate.getMonth() &&
                orderDate.getFullYear() === selectedDate.getFullYear());
        });
        const total = orders.reduce((acc, order) => acc + order.amount, 0);
        const monthly = monthlyOrders.reduce((acc, order) => acc + order.amount, 0);
        const daily = dailyOrders.reduce((acc, order) => acc + order.amount, 0);
        setTotalRevenue(total);
        setMonthlyRevenue(monthly);
        setDailyRevenue(daily);
    };
    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };
    const handleMonthChange = (event) => {
        setSelectedMonth(Number(event.target.value));
    };
    const handleYearChange = (event) => {
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
        const merged = orders.reduce((acc, o) => {
            const user = acc.find((item) => item.user_id._id === o.user_id._id);
            if (user) {
                user.amount += o.amount;
            }
            else {
                acc.push({ ...o });
            }
            return acc;
        }, []);
        return merged.sort((a, b) => b.amount - a.amount);
    }, [orders]);
    const top10Courses = [...courses].sort((a, b) => b.enrollment_count - a.enrollment_count).slice(0, 10);
    if (loading) {
        return _jsx("p", { children: "Loading ..." });
    }
    if (error) {
        return _jsxs("p", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "tw-container tw-mx-auto tw-px-4", children: [_jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-mb-4", children: [_jsx("h1", { className: "tw-text-xl tw-font-semibold", children: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" }), _jsx("button", { style: { background: theme.palette.background.default }, className: "tw-py-2 tw-px-4", children: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" })] }), _jsxs("div", { className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-3", children: [_jsx("div", { className: "md:tw-col-span-3", children: _jsxs("div", { className: "tw-p-5", style: { background: theme.palette.background.default }, children: [_jsxs("div", { children: [_jsx("h2", { className: "tw-text-lg tw-font-semibold", children: "S\u1ED1 ti\u1EC1n" }), _jsxs("div", { className: "mb-2", children: [_jsx("select", { id: "month", value: selectedMonth, onChange: handleMonthChange, children: Array.from({ length: 12 }, (_, i) => (_jsx("option", { value: i, children: new Date(0, i).toLocaleString('default', { month: 'long' }) }, i))) }), _jsx("label", { htmlFor: "year", className: "ml-4 mr-2", children: "N\u0103m:" }), _jsx("select", { id: "year", value: selectedYear, onChange: handleYearChange, children: Array.from({ length: 5 }, (_, i) => (_jsx("option", { value: new Date().getFullYear() - i, children: new Date().getFullYear() - i }, i))) })] })] }), _jsx(Bar, { data: data, options: options })] }) }), _jsxs("div", { style: { background: theme.palette.background.default }, className: "tw-shadow-md tw-relative", children: [_jsx("div", { className: "tw-flex tw-justify-between tw-px-4", children: _jsx("h3", { className: "tw-text-lg tw-font-semibold", children: "H\u1ECDc vi\u00EAn" }) }), _jsx("div", { className: "tw-text-[90px] tw-text-white tw-bg-violet-500 tw-rounded-full tw-h-[200px] tw-w-[200px] tw-flex tw-items-center tw-justify-center tw-mx-auto tw-my-10", children: users.length }), _jsx("div", { className: "tw-bg-black tw-text-white tw-h-[25%] tw-w-[100%] lg:tw-absolute tw-bottom-0 tw-p-4", children: _jsxs("div", { className: "md:tw-mt-3", children: [_jsxs("p", { className: "tw-text-[#AAC8C6] tw-font-medium tw-text-lg tw-mb-2", children: ["Doanh thu th\u00E1ng ", new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'numeric' })] }), _jsxs("p", { className: "tw-font-semibold tw-text-3xl", children: [monthlyRevenue.toLocaleString('vi-VN'), " VN\u0110"] }), _jsx("p", { className: "tw-text-green-600", children: "Doanh thu trong c\u1EA3 m\u1ED9t th\u00E1ng" })] }) })] }), _jsx("div", { className: " md:tw-col-span-4 ", children: _jsx("div", { className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3", children: _jsx("div", { className: "md:tw-col-span-3 ", children: _jsxs("div", { className: "tw-mb-3 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3  ", children: [_jsxs("div", { style: { background: theme.palette.background.default }, className: " tw-px-4 tw-shadow-md ", children: [_jsxs("div", { className: "tw-flex tw-justify-between", children: [_jsx("h3", { className: "tw-text-base tw-font-semibold", children: "Doanh thu ng\u00E0y:" }), _jsx("div", { className: "tw-mt-5", children: _jsx("input", { id: "date", type: "date", value: selectedDate.toISOString().split('T')[0], onChange: handleDateChange }) })] }), _jsxs("p", { className: "tw-text-2xl tw-text-center tw-font-bold", children: [dailyRevenue.toLocaleString('vi-VN'), " VN\u0110"] })] }), _jsxs("div", { style: { background: theme.palette.background.default }, className: " tw-px-4 tw-shadow-md  ", children: [_jsx("h3", { className: "tw-text-base tw-font-semibold", children: "T\u1ED5ng danh thu:" }), _jsxs("p", { className: "tw-text-2xl tw-pb-10 tw-mt-5 tw-text-center tw-font-bold", children: [totalRevenue.toLocaleString('vi-VN'), " VN\u0110"] })] })] }) }) }) }), _jsxs("div", { style: { background: theme.palette.background.default }, className: "md:tw-col-span-2 tw-shadow-md", children: [_jsx("div", { className: "tw-flex tw-justify-between tw-px-4", children: _jsx("h3", { className: "tw-text-lg tw-font-semibold", children: "Top 10 kho\u00E1 h\u1ECDc y\u00EAu th\u00EDch" }) }), _jsx(TableContainer, { component: Paper, children: _jsxs(Table, { size: "small", "aria-label": "top 10 courses table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "STT" }), _jsx(TableCell, { children: "\u1EA2nh" }), _jsx(TableCell, { children: "T\u00EAn kho\u00E1 h\u1ECDc" }), _jsx(TableCell, { align: "right", children: "L\u01B0\u1EE3t \u0111\u0103ng k\u00FD" })] }) }), _jsx(TableBody, { children: top10Courses.map((course, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: index + 1 }), _jsx(TableCell, { children: _jsx(Avatar, { variant: "square", src: course.thumbnail, alt: "Course", sx: { width: 40, height: 28 } }) }), _jsx(TableCell, { children: course.title }), _jsx(TableCell, { align: "right", children: course.enrollment_count })] }, course._id))) })] }) })] }), _jsxs("div", { style: { background: theme.palette.background.default }, className: "tw-shadow-md tw-overflow-hidden md:tw-col-span-2", children: [_jsx("div", { className: "tw-flex tw-justify-between tw-px-4", children: _jsx("h3", { className: "tw-text-lg tw-font-semibold", children: "Top 10 chi\u1EBFn th\u1EA7n chi ti\u00EAu" }) }), _jsx(TableContainer, { component: Paper, sx: { px: 3 }, children: _jsxs(Table, { size: "small", "aria-label": "a dense table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "STT" }), _jsx(TableCell, { children: "T\u00EAn h\u1ECDc vi\u00EAn" }), _jsx(TableCell, { align: "right", children: "S\u1ED1 ti\u1EC1n chi ti\u00EAu" })] }) }), _jsx(TableBody, { children: ordersSorted.map((o, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: index + 1 }), _jsx(TableCell, { children: o.user_id.name }), _jsxs(TableCell, { align: "right", children: [o.amount.toLocaleString('vi-VN'), " VN\u0110"] })] }, index))) })] }) })] })] })] }));
};
export default Dashboard;
