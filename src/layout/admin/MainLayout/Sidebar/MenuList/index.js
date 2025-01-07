import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography } from '@mui/material';
// Project imports
import NavGroup from './NavGroup';
import menuItem from '@/menu-items'; // Ensure this path is correct and the module is properly typed
// ==============================|| SIDEBAR MENU LIST ||============================== //
const MenuList = () => {
    // Type assertion to ensure menuItem conforms to MenuItems
    const navItems = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return _jsx(NavGroup, { item: item }, item.id);
            default:
                return (_jsx(Typography, { variant: "h6", color: "error", align: "center", children: "Menu Items Error" }, item.id));
        }
    });
    return _jsx(_Fragment, { children: navItems });
};
export default MenuList;
