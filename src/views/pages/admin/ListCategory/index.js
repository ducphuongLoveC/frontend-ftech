import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
const CourseCategory = () => {
    const theme = useTheme();
    const categories = [
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
        {
            id: 1,
            title: 'Frontend',
            description: 'Front-end developer là lập trình viên chịu trách nhiệm chính trong việc phát triển Client Side. Hiểu một cách đơn giản front-end developer là những người thực...',
            quantity: 13,
        },
    ];
    return (_jsxs("div", { className: "tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6", children: [_jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-mb-6", children: [_jsx("h1", { className: "tw-text-xl tw-font-semibold", children: "Qu\u1EA3n l\u00FD danh m\u1EE5c kh\u00F3a h\u1ECDc" }), _jsx("button", { className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4 tw-rounded", children: "B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n" })] }), _jsxs("div", { style: { background: theme.palette.background.default }, className: "tw-bg-gray-100 tw-py-4 tw-px-6  tw-flex tw-justify-between tw-items-center tw-mb-6", children: [_jsx("p", { children: "Ch\u1EE9c n\u0103ng \"Th\u00EAm Danh M\u1EE5c Kh\u00F3a H\u1ECDc\" cho ph\u00E9p ng\u01B0\u1EDDi d\u00F9ng qu\u1EA3n l\u00FD h\u1EC7 th\u1ED1ng danh m\u1EE5c c\u00F3 th\u1EC3 th\u00EAm m\u1EDBi danh m\u1EE5c kh\u00F3a h\u1ECDc m\u1EDBi v\u00E0o c\u01A1 s\u1EDF d\u1EEF li\u1EC7u." }), _jsx("button", { className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4 tw-rounded", children: "Th\u00EAm danh m\u1EE5c" })] }), _jsx("div", { className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 tw-gap-4", children: categories.map((category) => (_jsxs("div", { style: { background: theme.palette.background.default }, className: " tw-shadow-sm  tw-p-6 tw-border ", children: [_jsx("h2", { className: "tw-text-xl tw-font-semibold tw-mb-2", children: category.title }), _jsx("p", { className: "tw-text-xs tw-text-gray-500 tw-w-3/4 tw-mb-4", children: category.description }), _jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [_jsx("button", { className: "tw-bg-purple-500 tw-text-white tw-py-2 tw-px-4  tw-text-sm", children: "Chi ti\u1EBFt danh m\u1EE5c" }), _jsxs("p", { className: "tw-text-sm tw-text-gray-700", children: ["S\u1ED1 l\u01B0\u1EE3ng: ", category.quantity] })] })] }, category.id))) })] }));
};
export default CourseCategory;
