import { useTheme, Theme, Box, useMediaQuery } from '@mui/material';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
// interface MainLayoutProp {
//   children: React.ReactNode;
// }

// const MainLayout: React.FC<MainLayoutProp> = ({ children }) => {
const MainLayout: React.FC = () => {
  const theme: Theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: theme.palette.background.paper,
        minHeight: '100vh',
      }}
    >
      <Header />

      <Box
        sx={{
          display: 'flex',
          background: theme.palette.background.paper,
        }}
      >
        <SideBar />
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: '86%',
              md: '84%',
              lg: '87%',
            },
            [`@media (min-width:2000px)`]: {
              width: '1630px',
              margin: 'auto',
              padding: 0,
            },

            px: downMD ? 2 : 0,
          }}
        >
          {/* {children} */}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
