// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useTheme, useMediaQuery, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
// import { SvgIconComponent } from '@mui/icons-material'

// import menus, { Props as PropsMenuHome } from '@/menu-items/sidebar-home'

// const SideBar: React.FC = () => {
//   const [activeUrl, setActiveUrl] = useState(window.location.pathname)

//   const theme = useTheme()
//   const downSM = useMediaQuery(theme.breakpoints.down('sm'))

//   const handleLinkClick = (url: string) => {
//     if (url !== activeUrl) {
//       setActiveUrl(url)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         width: downSM ? '100%' : '70px',
//         height: downSM ? '55px' : '100%',
//         margin: downSM ? 0 : '10px 10px 0 10px',
//         padding: 0,
//         position: downSM ? 'fixed' : 'sticky',
//         top: downSM ? 'auto' : '80px',
//         bottom: downSM ? 0 : 'auto',
//         zIndex: downSM ? 999 : 'auto',
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: downSM ? '0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)' : 'none',
//       }}
//     >
//       <List
//         sx={{
//           display: 'flex',
//           flexDirection: downSM ? 'row' : 'column',
//           justifyContent: downSM ? 'space-between' : 'center',
//           alignItems: 'center',
//           fontSize: downSM ? '10px' : 'var(--mini-font-size)',
//           padding: 0,
//           height: '100%',
//         }}
//       >
//         {menus.map((m: PropsMenuHome, index: number) => {
//           const Icon = m.icon as SvgIconComponent
//           const isActive = activeUrl === m.url

//           return (
//             <ListItem key={index} disablePadding sx={{ padding: 0, margin: 0 }}>
//               <ListItemButton
//                 component={Link}
//                 target={m.target ? '_blank' : '_self'}
//                 to={m.url}
//                 onClick={() => handleLinkClick(m.url)}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: downSM ? '20px' : '70px',
//                   height: downSM ? '100%' : '70px',
//                   borderRadius: downSM ? '3px' : '14px',
//                   background: isActive ? theme.palette.background.paper2 : 'transparent',
//                   padding: downSM ? 0 : '10px 0',
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,

//                   }}
//                 >
//                   {Icon && <Icon style={{color: theme.palette.text.primary}} />}
//                 </ListItemIcon>
//                 <Typography sx={{ textAlign: 'center', fontSize: downSM ? '10px' : '13px', }} >{m.title}</Typography>
//               </ListItemButton>
//             </ListItem>
//           )
//         })}
//       </List>
//     </Box>
//   )
// }

// export default SideBar

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery, Box, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import menus, { Props as PropsMenuHome } from '@/menu-items/sidebar-home';

const SideBar: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState(window.location.pathname);
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLinkClick = (url: string) => {
    if (url !== activeUrl) {
      setActiveUrl(url);
    }
  };

  return (
    <Box
      sx={{
        width: downSM ? '100%' : '80px', // Tăng nhẹ chiều rộng
        height: downSM ? '60px' : '100%',
        margin: downSM ? 0 : '10px 15px 0 15px',
        padding: '0',
        position: downSM ? 'fixed' : 'sticky',
        top: downSM ? 'auto' : '100px',
        bottom: downSM ? 0 : 'auto',
        zIndex: downSM ? 999 : 1000,
        backgroundColor: theme.palette.background.paper,
        borderRadius: downSM ? 0 : '16px', // Thêm border radius
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', // Shadow nhẹ hơn và tinh tế hơn
        transition: 'all 0.3s ease-in-out', // Thêm transition mượt
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: downSM ? 'row' : 'column',
          justifyContent: downSM ? 'space-around' : 'flex-start',
          alignItems: 'center',
          padding: downSM ? '0 10px' : '0',
          height: '100%',
          gap: downSM ? 0 : '8px', // Thêm khoảng cách giữa các items
        }}
      >
        {menus.map((m: PropsMenuHome, index: number) => {
          const Icon = m.icon as SvgIconComponent;
          const isActive = activeUrl === m.url;

          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                padding: 0,
                margin: downSM ? '0 5px' : '0',
                transition: 'all 0.2s ease', // Transition cho hover
                '&:hover': {
                  transform: 'scale(1.05)', // Hiệu ứng phóng to nhẹ khi hover
                },
              }}
            >
              <ListItemButton
                component={Link}
                target={m.target ? '_blank' : '_self'}
                to={m.url}
                onClick={() => handleLinkClick(m.url)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: downSM ? '60px' : '64px',
                  height: downSM ? '50px' : '64px',
                  borderRadius: '12px',
                  background: isActive ? theme.palette.primary.light : 'transparent',
                  padding: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: isActive ? theme.palette.primary.light : theme.palette.grey[100],
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    marginBottom: '4px',
                  }}
                >
                  {Icon && (
                    <Icon
                      style={{
                        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                        fontSize: downSM ? '20px' : '24px',
                      }}
                    />
                  )}
                </ListItemIcon>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: downSM ? '11px' : '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    textTransform: 'capitalize',
                  }}
                >
                  {m.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
