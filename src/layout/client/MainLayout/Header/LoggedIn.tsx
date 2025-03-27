import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Badge,
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

// tippy
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';

import lodash from 'lodash';
// moment
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
import * as actionTypes from '@/store/actions';
// icon
import { BiBell } from 'react-icons/bi';

// my pj

import Dropdown from '@/components/Dropdown';
import Wrapper from '@/components/Wrapper';

import path from '@/constants/routes';
import Cookies from 'js-cookie';
// socket
import { io } from 'socket.io-client';

// api
import {
  deleteAllNotificationsByUserId,
  getNotificationById,
  markAllAsRead,
  markAsRead,
} from '../../../../api/notification';

interface UserProp {
  user: {
    _id: string;
    name: string;
    email: string;
    nickname: string;
    profile_picture?: string;
    role?: string;
  };
}
const socket = io(import.meta.env.VITE_URL_SERVER);

const LoggedIn: React.FC<UserProp> = ({ user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const {
    data: notifications,
    isLoading: isLoadingNoti,
    refetch,
  } = useQuery({
    queryKey: ['notification'],
    queryFn: () => getNotificationById(user._id),
  });

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: '' });
    dispatch({ type: actionTypes.SET_USER, payload: '' });
  };

  const handleNotificationClick = async (notification: any) => {
    await markAsRead(notification._id);
    switch (notification.type) {
      case 'comment':
        const { course_id, resource_id, comment_id } = notification.data;
        navigate(`/learning/${course_id}?id=${resource_id}&comment=${comment_id}`);
        break;
    }
  };

  const handleMarkIsReadUserNotifications = async () => {
    const res = await markAllAsRead(user._id);
    if (res.status === 200) {
      refetch();
    }
  };

  const handleDeleteAllNotificationsByUserId = async () => {
    const res = await deleteAllNotificationsByUserId(user._id);
    if (res.status === 200) {
      refetch();
    }
  };

  const notificationUnReadTotal = () => {
    return notifications.reduce(
      (acc: number, currentNotification: any) => acc + (!currentNotification.isRead ? 1 : 0),
      0,
    );
  };

  // socket notification
  useEffect(() => {
    socket.emit('joinNotificationRoom', user._id);

    socket.on('newNotification', (data) => {
      refetch();
      console.log(data);
    });
    return () => {
      socket.emit('leaveNotificationRoom', user._id);
      socket.off('newNotification');
    };
  }, []);

  if (isLoadingNoti) return <div>Loading...</div>;
  return (
    <>
      <Box sx={{ position: 'relative', ml: downSM ? 0.5 : 1 }}>
        <Box sx={{ fontSize: '1.5rem', px: 1 }}>
          <Badge badgeContent={notificationUnReadTotal()} color="error">
            <HeadlessTippy
              trigger="click"
              placement="top-end"
              interactive
              allowHTML
              render={(attrs) => (
                <Wrapper
                  style={{
                    background: theme.palette.background.paper,
                    width: `${downSM ? 300 : 400}px`,
                    maxHeight: '70vh',
                    overflow: 'auto',
                  }}
                  {...attrs}
                >
                  <Dropdown.Container>
                    <Dropdown.Header
                      head="Thông báo"
                      hExtend={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Button onClick={handleMarkIsReadUserNotifications} sx={{ py: 2 }}>
                            Đánh dấu là đã đọc
                          </Button>
                          <Button onClick={handleDeleteAllNotificationsByUserId} sx={{ color: 'red' }}>
                            xóa
                          </Button>
                        </Box>
                      }
                    />
                    {notifications.length > 0 ? (
                      notifications.map((n: any, index: number) => (
                        <Dropdown.ImageDescription
                          isUnRead={!n.isRead}
                          onClick={() => handleNotificationClick(n)}
                          key={index}
                          hover
                          thumbnail={n.data.thumbnail}
                          bodyHead={<Typography dangerouslySetInnerHTML={{ __html: n.data.title }} />}
                          bodyContent={
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: lodash.truncate(n.data.content, {
                                  length: 40,
                                  omission: '...',
                                }),
                              }}
                            />
                          }
                          bExtend={
                            <Typography
                              sx={{
                                fontSize: 'var(--mini-font-size)',
                              }}
                            >
                              {moment(n.createdAt).fromNow()}
                            </Typography>
                          }
                        />
                      ))
                    ) : (
                      <Typography textAlign={'center'}>Không có thông báo</Typography>
                    )}
                  </Dropdown.Container>
                </Wrapper>
              )}
            >
              <Tippy content="Thông báo">
                <IconButton sx={{ p: 0 }}>
                  <BiBell style={{ color: theme.palette.text.primary }} />
                </IconButton>
              </Tippy>
            </HeadlessTippy>
          </Badge>
        </Box>
      </Box>
      {/* logined */}
      <Box sx={{ ml: downSM ? 0.5 : 1 }}>
        <HeadlessTippy
          trigger="click"
          placement="bottom-end"
          interactive
          allowHTML
          render={(attrs) => (
            <Wrapper
              style={{
                background: theme.palette.background.paper,
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '1rem',
              }}
              {...attrs}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar src={user.profile_picture} sx={{ width: 48, height: 48 }} />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem button component={Link} to={`/profile?id=${user._id}`}>
                  <ListItemText primary="Trang cá nhân" />
                </ListItem>
                <ListItem button component={Link} to={path.client.myCourses}>
                  <ListItemText primary="Khóa học của tôi" />
                </ListItem>
                <ListItem button component={Link} to={path.client.checkCertificate}>
                  <ListItemText primary="Tìm chứng chỉ" />
                </ListItem>
                <ListItem button component={Link} to={path.client.setting}>
                  <ListItemText primary="Cài đặt" />
                </ListItem>
                <ListItem button onClick={handleLogout} sx={{ color: 'red' }}>
                  <ListItemText primary="Đăng xuất" />
                </ListItem>
              </List>
            </Wrapper>
          )}
        >
          <Tippy content="Trang cá nhân">
            <IconButton>
              <Avatar
                src={user.profile_picture}
                sx={{
                  width: 36,
                  height: 36,
                  border: `3px solid ${theme.palette.divider}`,
                }}
              />
            </IconButton>
          </Tippy>
        </HeadlessTippy>
      </Box>
    </>
  );
};
export default LoggedIn;
