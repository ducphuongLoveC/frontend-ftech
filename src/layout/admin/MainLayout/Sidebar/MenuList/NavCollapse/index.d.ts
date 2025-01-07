interface MenuItem {
    id: string;
    type: 'collapse' | 'item';
    title?: string;
    caption?: string;
    icon?: React.ElementType;
    url?: string;
    children?: MenuItem[];
}
interface NavCollapseProps {
    menu: MenuItem;
    level: number;
}
declare const NavCollapse: React.FC<NavCollapseProps>;
export default NavCollapse;
