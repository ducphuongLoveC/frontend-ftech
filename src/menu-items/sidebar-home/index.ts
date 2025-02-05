import {
  Home as HomeIcon,
  LibraryBooks as LibraryBooksIcon,
  Telegram as TelegramIcon,
} from '@mui/icons-material';

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
    icon: TelegramIcon,
    title: 'Contact',
    url: '/contact',
    target: false,
  },
];

export default menus;
