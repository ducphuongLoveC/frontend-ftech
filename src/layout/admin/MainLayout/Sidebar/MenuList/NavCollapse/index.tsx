import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { RootState } from '@/store/reducer';

// Define the types for the NavCollapseProps and MenuItem
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

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse: React.FC<NavCollapseProps> = ({ menu, level }) => {
  const theme = useTheme();
  const customization = useSelector((state: RootState) => state.mainReducer);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  const { pathname } = useLocation();

  const checkOpenForParent = (child: MenuItem[], id: string) => {
    child.forEach((item) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    setSelected(null);
    if (menu.children) {
      menu.children.forEach((item) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }
  }, [pathname, menu.children]);

  // menu collapse & item
  const menus = menu.children?.map((item: any) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon: any = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{
        marginTop: 'auto',
        marginBottom: 'auto',
        color: theme.palette.text.primary,
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : theme.palette.background.paper,
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
          ':hover': {
            backgroundColor: theme.palette.background.paper2,
          },
          ':focus': {
            backgroundColor: theme.palette.background.paper2,
          },
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            my: 'auto',
            minWidth: !menu.icon ? 18 : 36,
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={selected === menu.id ? 'h5' : 'body1'}
              sx={{
                my: 'auto',
              }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
