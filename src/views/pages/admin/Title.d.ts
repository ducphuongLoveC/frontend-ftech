import { ButtonProps } from '@mui/material';
interface TitleProps extends ButtonProps {
    titleButton?: string;
    des: string;
    link?: string;
}
declare const HeaderTitle: React.FC<TitleProps>;
export default HeaderTitle;
