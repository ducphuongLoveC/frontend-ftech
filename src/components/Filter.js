import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, TextField, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText, Paper, Grid, Button, } from '@mui/material';
const FilterComponent = ({ filters, onFilter }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});
    // Gửi kết quả sau khi debounce
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleFilter = () => {
        console.log(selectedFilters);
        const data = Object.keys(selectedFilters).reduce((result, filterName) => {
            const selectedItems = selectedFilters[filterName];
            const filter = filters.find((f) => f.name === filterName);
            // Kiểm tra xem filter có tồn tại hay không
            if (!filter || !selectedItems || selectedItems.length === 0)
                return result;
            // Không cần phải lọc theo `selected` nữa, chỉ sử dụng value trực tiếp
            const filteredData = selectedItems.map((value) => {
                return { value: value.value, display: value.display };
            });
            // Thêm vào đối tượng kết quả với key là filterName
            if (filteredData.length > 0) {
                result[filterName] = filteredData;
            }
            return result;
        }, {});
        // Gửi kết quả filter với searchText và các giá trị lọc
        onFilter({ search: searchText, ...data });
    };
    return (_jsx(Box, { component: Paper, p: 2, mb: 2, children: _jsxs(Grid, { container: true, spacing: 3, children: [_jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(FormControl, { fullWidth: true, children: _jsx(TextField, { label: "T\u00ECm ki\u1EBFm", variant: "outlined", fullWidth: true, value: searchText, onChange: handleSearchChange }) }) }), filters.map((filter) => (_jsx(Grid, { item: true, xs: 12, md: 2, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: filter.displayName }), _jsx(Select, { label: filter.displayName, multiple: true, value: selectedFilters[filter.name] || [], onChange: (e) => {
                                    const selectedValues = e.target.value;
                                    setSelectedFilters((prev) => ({
                                        ...prev,
                                        [filter.name]: selectedValues,
                                    }));
                                }, renderValue: (selecteds) => {
                                    return selecteds.map((s) => s.display).join(', ');
                                }, children: filter?.values?.map((value) => (_jsxs(MenuItem, { value: value, children: [_jsx(Checkbox, { checked: selectedFilters[filter.name]?.includes(value) || false }), _jsx(ListItemText, { primary: value.display })] }, value.value))) })] }) }, filter.name))), _jsx(Grid, { item: true, xs: 12, md: 2, children: _jsx(FormControl, { fullWidth: true, children: _jsx(Button, { sx: { p: 1.5 }, onClick: handleFilter, variant: "outlined", children: "\u00C1p d\u1EE5ng" }) }) })] }) }));
};
export default FilterComponent;
