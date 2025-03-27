import { Link } from 'react-router-dom';
import { Button, ListItem, useTheme } from '@mui/material';

const NotLoggedIn = () => {
  const theme = useTheme();
  return (
    <>
      <ListItem sx={{ display: { xs: 'none', md: 'block' } }}>
        <Button
          component={Link}
          to="/auth/register"
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: '8px',
            textTransform: 'none',
            color: theme.palette.text.primary,
          }}
        >
          Đăng ký
        </Button>
      </ListItem>
      <ListItem sx={{ padding: 0 }}>
        <Button
          component={Link}
          to="/auth/login"
          sx={{
            background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            maxWidth: 'max-content',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(to right, #00C9FFdd, #92FE9Ddd)',
            },
          }}
        >
          Đăng nhập
        </Button>
      </ListItem>
    </>
  );
};

export default NotLoggedIn;
