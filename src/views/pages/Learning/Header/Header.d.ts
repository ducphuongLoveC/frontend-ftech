import { Module } from '@/interfaces/course';
import { NoteProp } from '@/interfaces/Note';
interface HeaderProps {
    notes: NoteProp[];
    data: Module[];
}
declare const Header: React.FC<HeaderProps>;
export default Header;
