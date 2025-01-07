interface MenuItem {
    id: string;
    type: 'collapse' | 'item';
    title: string;
    caption?: string;
    children?: MenuItem[];
}
interface NavGroupProps {
    item: MenuItem;
}
declare const NavGroup: React.FC<NavGroupProps>;
export default NavGroup;
