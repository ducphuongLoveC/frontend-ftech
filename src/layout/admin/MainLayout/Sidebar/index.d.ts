import React from 'react';
interface SidebarProps {
    drawerOpen: boolean;
    drawerToggle: () => void;
    window?: Window | null;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
