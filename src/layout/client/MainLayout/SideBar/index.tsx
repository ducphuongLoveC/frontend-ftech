import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
        width: downSM ? '100%' : '70px',
        margin: downSM ? 0 : '10px 10px 0 10px',
        padding: downSM ? '2px' : 0,
        position: downSM ? 'fixed' : 'static',
        bottom: downSM ? 0 : 'auto',
        zIndex: downSM ? 999 : 'auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: downSM
          ? '0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)'
          : 'none',
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: downSM ? 'row' : 'column',
          justifyContent: downSM ? 'space-around' : 'center',
          alignItems: 'center',
          fontSize: downSM ? '10px' : 'var(--mini-font-size)',
        }}
      >
        {menus.map((m: PropsMenuHome, index: number) => {
          const Icon = m.icon as SvgIconComponent;
          const isActive = activeUrl === m.url;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={m.url}
                onClick={() => handleLinkClick(m.url)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: downSM ? '45px' : '70px',
                  height: downSM ? '45px' : '70px',
                  borderRadius: downSM ? '3px' : '14px',
                  backgroundColor: !downSM && isActive ? '#e8ebed' : 'transparent',
                  color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: 'rgb(236, 236, 236)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    fontSize: downSM ? '10px' : '15px',
                  }}
                >
                  {Icon && <Icon />}
                </ListItemIcon>
                <ListItemText primary={m.title} sx={{ textAlign: 'center'}} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default SideBar;
