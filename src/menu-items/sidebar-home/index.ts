import {
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  Telegram as TelegramIcon,
} from '@mui/icons-material';


import FacebookIcon from '@mui/icons-material/Facebook';

import path from '@/constants/routes';

export interface Props {
  icon: React.ReactNode | Function;
  title: string;
  url: string;
  target: boolean;
}

const menus: Props[] = [
  {
    icon: HomeIcon,
    title: 'Home',
    url: '/',
    target: false,
  },
  {
    icon: LibraryBooksIcon,
    title: 'Courses',
    url: path.client.myCourses,
    target: false,
  },
  {
    icon: FacebookIcon,
    title: 'Facebook',
    url: 'https://www.facebook.com/phuongg.profile',
    target: true,
  },
];

export default menus;
