// import { useTheme, IconButton, TextField, Button, Typography, Snackbar } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateUser, updateAvatar } from '../../../store/actions';
// import PasswordModal from './PasswordModal';
// import AvatarUploadModal from './AvatarUploadModal';

// import Section from './Section';
// import { SectionItem } from './Section';
// import axiosInstance from '@/api/axiosInstance';
// import { RootState } from '@/store/reducer';

// const sections: SectionItem[] = [
//   {
//     field: 'Thông tin người dùng',
//     section: 'personalInfo',
//   },
//   {
//     field: 'Đổi mật khẩu',
//     section: 'securitySettings',
//   },
// ];

// interface EditableField {
//   isEditing: boolean;
//   value: string;
// }

// const SettingUser: React.FC = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.authReducer.user);
//   // Thay đổi cách lấy userId
//   const userId = user?._id;
//   const dispatch = useDispatch();
//   const [activeSection, setActiveSection] = useState<string>('personalInfo');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [openPasswordModal, setOpenPasswordModal] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // State cho các trường có thể chỉnh sửa
//   const [editableFields, setEditableFields] = useState<{
//     [key: string]: EditableField;
//   }>({
//     name: { isEditing: false, value: user?.name || '' },
//     phone: { isEditing: false, value: user?.phone || '' },
//     referring: { isEditing: false, value: user?.referring || '' },
//   });

//   // State để lưu URL avatar hiện tại
//   const [avatarUrl, setAvatarUrl] = useState<any>(user?.profile_picture || 'default-avatar.png');

//   // State để quản lý trạng thái loading khi upload
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   // State để quản lý Snackbar
//   const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   // console.log('User from Redux:', user);
//   // console.log('UserId:', userId);
//   useEffect(() => {
//     if (user) {
//       // Cập nhật editableFields khi user thay đổi
//       setEditableFields({
//         name: { isEditing: false, value: user.name || '' },
//         phone: { isEditing: false, value: user.phone || '' },
//         referring: { isEditing: false, value: user.referring || '' },
//       });
//       setAvatarUrl(user.profile_picture || 'default-avatar.png');
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.profile_picture) {
//       setAvatarUrl(user.profile_picture);
//     }
//   }, [user?.profile_picture]);

//   // Handle section change
//   const handleSectionChange = (section: string) => {
//     setActiveSection(section);
//   };

//   // Bắt đầu chỉnh sửa trường
//   const startEditing = (field: string) => {
//     setEditableFields({
//       ...editableFields,
//       [field]: { ...editableFields[field], isEditing: true },
//     });
//   };

//   // Hủy chỉnh sửa
//   const cancelEditing = (field: string) => {
//     setEditableFields({
//       ...editableFields,
//       [field]: {
//         isEditing: false,
//         value: user[field] || '',
//       },
//     });
//   };

//   // Lưu giá trị mới
//   const saveField = async (field: string) => {
//     if (!userId) {
//       console.error('Không tìm thấy userId');
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log('Đang cập nhật field:', field, 'với giá trị:', editableFields[field].value);

//       // Sửa lại endpoint theo router backend
//       const response = await axiosInstance.put(`/api/user/${userId}`, {
//         [field]: editableFields[field].value,
//       });

//       console.log('Kết quả API:', response.data);

//       if (response.data.success) {
//         // Dispatch action để cập nhật Redux store
//         dispatch(updateUser({ [field]: editableFields[field].value }));

//         setEditableFields({
//           ...editableFields,
//           [field]: {
//             ...editableFields[field],
//             isEditing: false,
//           },
//         });

//         // Hiển thị thông báo thành công
//         setSnackbar({ open: true, message: 'Cập nhật thành công!' });
//       } else {
//         setSnackbar({ open: true, message: response.data.message });

//         throw new Error(response.data.message);
//       }
//     } catch (error: any) {
//       console.log(error);

//       console.error('Lỗi khi cập nhật dữ liệu:', error);
//       setSnackbar({ open: true, message: error.response.data.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cập nhật giá trị đang chỉnh sửa
//   const handleFieldChange = (field: string, newValue: string) => {
//     setEditableFields({
//       ...editableFields,
//       [field]: {
//         ...editableFields[field],
//         value: newValue,
//       },
//     });
//   };

//   // Handle password modal
//   const handleOpenPasswordModal = () => {
//     setOpenPasswordModal(true);
//   };

//   const handleClosePasswordModal = () => {
//     setOpenPasswordModal(false);
//   };

//   const handleSavePassword = (newPassword: string) => {
//     console.log(newPassword);
//     handleClosePasswordModal();
//   };

//   // Xử lý lỗi ảnh
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     e.currentTarget.src = '/default-avatar.png';
//   };

//   // Handle avatar click
//   const handleAvatarClick = () => {
//     setIsModalOpen(true);
//   };

//   // Xử lý upload avatar
//   const handleAvatarUpload = async (file: File) => {
//     if (!userId) {
//       console.error('Không tìm thấy userId');
//       return;
//     }
//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axiosInstance.post('/api/media/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
//         profile_picture: response.data.url,
//       });

//       if (response.data.success && responseUpdatePictureLink.data.success) {
//         const newAvatarUrl = response.data.url;
//         dispatch(updateAvatar(newAvatarUrl));
//         setAvatarUrl(newAvatarUrl);
//         setIsModalOpen(false);
//         setSnackbar({ open: true, message: 'Cập nhật ảnh đại diện thành công!' });
//         console.log(newAvatarUrl);
//       } else {
//         throw new Error(response.data.message || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Error uploading avatar:', error);
//       setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại!' });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Close page
//   const handleClosePage = () => {
//     navigate('/');
//   };
//   console.log(avatarUrl);
//   // Render field với khả năng chỉnh sửa
//   const renderEditableField = (field: string, label: string) => {
//     const { isEditing, value } = editableFields[field];

//     return (
//       <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md">
//         <span className="">{label}</span>
//         {isEditing ? (
//           <div className="tw-mt-2">
//             <TextField
//               fullWidth
//               value={value}
//               onChange={(e) => handleFieldChange(field, e.target.value)}
//               size="small"
//               className="tw-mb-2"
//             />
//             <div className="tw-flex tw-gap-2">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="small"
//                 onClick={() => saveField(field)}
//                 disabled={loading}
//               >
//                 Lưu
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="small"
//                 onClick={() => cancelEditing(field)}
//                 disabled={loading}
//               >
//                 Hủy
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="tw-cursor-pointer" onClick={() => startEditing(field)}>
//             <p className="">{user[field] || 'Chưa cập nhật'}</p>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="tw-w-full" style={{ background: theme.palette.background.paper }}>
//       <div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-w-full tw-min-h-screen tw-bg-gray-100">
//         <IconButton
//           onClick={handleClosePage}
//           className="tw-absolute tw-top-4 tw-right-[-20px] md:tw-right-[50px] tw-bg-gray-200 tw-p-2 tw-rounded-full hover:tw-bg-gray-300"
//           aria-label="close"
//         >
//           <CloseIcon />
//         </IconButton>
//         <Section data={sections} onChange={(s) => handleSectionChange(s.section)} />
//         <div className="tw-w-full md:tw-w-3/4 tw-p-8" style={{ background: theme.palette.background.paper }}>
//           {activeSection === 'personalInfo' && (
//             <>
//               <h3 className="tw-text-2xl tw-mb-2 tw-font-bold">Thông tin cá nhân</h3>
//               <p className="tw-text-xs tw-mb-6 tw-text-gray-400">Quản lý thông tin cá nhân của bạn.</p>
//               <div className="tw-mb-12">
//                 <h4 className="tw-text-lg tw-font-medium tw-mb-2">Thông tin cơ bản</h4>
//                 <p className="tw-text-xs tw-mb-6 tw-text-gray-400">
//                   Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn
//                 </p>
//                 <div className="tw-grid tw-grid-cols-1 md:tw-max-w-[800px] tw-gap-6">
//                   <div className="tw-border tw-border-gray-300 tw-rounded-md tw-p-4 hover:tw-shadow-md tw-transition-shadow">
//                     <div className="tw-flex tw-items-start tw-gap-6">
//                       {/* Avatar section */}
//                       <div className="tw-relative tw-group">
//                         <div className="tw-w-32 tw-h-32 tw-rounded-full tw-overflow-hidden tw-border-4 tw-border-gray-100 tw-shadow-lg">
//                           <img
//                             src={avatarUrl}
//                             onError={handleImageError}
//                             className={`tw-w-full tw-h-full tw-object-cover tw-transition-transform ${isUploading ? 'tw-opacity-50' : 'hover:tw-scale-105'}`}
//                             alt={user?.name || 'Avatar'}
//                           />
//                           {isUploading && (
//                             <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/50 tw-rounded-full">
//                               <span className="tw-text-white">Đang tải...</span>
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={handleAvatarClick}
//                           className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black/0 hover:tw-bg-black/40 tw-rounded-full tw-transition-all tw-cursor-pointer"
//                           aria-label="Change avatar"
//                         >
//                           <span className="tw-text-white tw-opacity-0 group-hover:tw-opacity-100 tw-text-sm tw-font-medium">
//                             Thay đổi ảnh
//                           </span>
//                         </button>
//                       </div>

//                       {/* Info section */}
//                       <div className="tw-flex-1">
//                         <div className="tw-mb-4">
//                           <Typography variant="h6" className="tw-font-medium">
//                             Ảnh hồ sơ
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             Ảnh đại diện giúp người dùng dễ dàng nhận biết bạn hơn
//                           </Typography>
//                         </div>

//                         <div className="tw-flex tw-gap-3">
//                           <Button
//                             variant="outlined"
//                             onClick={handleAvatarClick}
//                             startIcon={<AddPhotoAlternateIcon />}
//                             sx={{
//                               borderColor: '#6fe0dc',
//                               color: '#6fe0dc',
//                               '&:hover': {
//                                 borderColor: '#58bcb9',
//                                 backgroundColor: '#f0fafa',
//                               },
//                             }}
//                           >
//                             Tải ảnh lên
//                           </Button>
//                           <Typography variant="caption" color="textSecondary" className="tw-self-center">
//                             Định dạng: JPG, PNG (tối đa 1MB)
//                           </Typography>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {renderEditableField('name', 'Họ và tên')}
//                   {renderEditableField('phone', 'Số điện thoại')}
//                   {renderEditableField('referring', 'Giới thiệu')}
//                 </div>
//               </div>
//             </>
//           )}

//           {activeSection === 'securitySettings' && (
//             <>
//               <h3 className=" tw-mb-2 tw-font-bold hover:tw-shadow-md">Mật khẩu và bảo mật</h3>
//               <p className="tw-mb-10 tw-text-xs tw-text-gray-400">Cài đặt bảo mật tài khoản của bạn.</p>
//               <div className="tw-space-y-4">
//                 <div
//                   className="tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4 cursor-pointer"
//                   onClick={handleOpenPasswordModal}
//                 >
//                   <span className="">Đổi mật khẩu</span>
//                   <p className="tw-text-xs tw-text-gray-400">Bạn có muốn đổi mật khẩu chứ</p>
//                 </div>
//                 {/* <div className="tw-border tw-border-gray-300 hover:tw-shadow-md tw-rounded-md tw-p-4">
//                   <span className="">Xác thực hai yếu tố</span>
//                   <p className="">{user?.fa === 'true' ? 'Đã bật' : 'Chưa bật'}</p>
//                 </div> */}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <PasswordModal open={openPasswordModal} onClose={handleClosePasswordModal} onSave={handleSavePassword} />

//       <AvatarUploadModal
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         currentAvatarUrl={avatarUrl}
//         onUpload={handleAvatarUpload}
//       />

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={1000}
//         onClose={handleSnackbarClose}
//         message={snackbar.message}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </div>
//   );
// };

// export default SettingUser;






import { useTheme, IconButton, TextField, Button, Typography, Snackbar, Box, Paper, Grid, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateAvatar } from '../../../store/actions';
import PasswordModal from './PasswordModal';
import AvatarUploadModal from './AvatarUploadModal';

import Section from './Section';
import { SectionItem } from './Section';
import axiosInstance from '@/api/axiosInstance';
import { RootState } from '@/store/reducer';

const sections: SectionItem[] = [
  {
    field: 'Thông tin người dùng',
    section: 'personalInfo',
  },
  {
    field: 'Đổi mật khẩu',
    section: 'securitySettings',
  },
];

interface EditableField {
  isEditing: boolean;
  value: string;
}

const SettingUser: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authReducer.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
  const [loading, setLoading] = useState<boolean>(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editableFields, setEditableFields] = useState<{
    [key: string]: EditableField;
  }>({
    name: { isEditing: false, value: user?.name || '' },
    phone: { isEditing: false, value: user?.phone || '' },
    referring: { isEditing: false, value: user?.referring || '' },
  });

  const [avatarUrl, setAvatarUrl] = useState<any>(user?.profile_picture || 'default-avatar.png');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (user) {
      setEditableFields({
        name: { isEditing: false, value: user.name || '' },
        phone: { isEditing: false, value: user.phone || '' },
        referring: { isEditing: false, value: user.referring || '' },
      });
      setAvatarUrl(user.profile_picture || 'default-avatar.png');
    }
  }, [user]);

  useEffect(() => {
    if (user?.profile_picture) {
      setAvatarUrl(user.profile_picture);
    }
  }, [user?.profile_picture]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const startEditing = (field: string) => {
    setEditableFields({
      ...editableFields,
      [field]: { ...editableFields[field], isEditing: true },
    });
  };

  const cancelEditing = (field: string) => {
    setEditableFields({
      ...editableFields,
      [field]: {
        isEditing: false,
        value: user[field] || '',
      },
    });
  };

  const saveField = async (field: string) => {
    if (!userId) {
      console.error('Không tìm thấy userId');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put(`/api/user/${userId}`, {
        [field]: editableFields[field].value,
      });

      if (response.data.success) {
        dispatch(updateUser({ [field]: editableFields[field].value }));

        setEditableFields({
          ...editableFields,
          [field]: {
            ...editableFields[field],
            isEditing: false,
          },
        });

        setSnackbar({ open: true, message: 'Cập nhật thành công!' });
      } else {
        setSnackbar({ open: true, message: response.data.message });
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      setSnackbar({ open: true, message: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, newValue: string) => {
    setEditableFields({
      ...editableFields,
      [field]: {
        ...editableFields[field],
        value: newValue,
      },
    });
  };

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handleSavePassword = (newPassword: string) => {
    console.log(newPassword);
    handleClosePasswordModal();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/default-avatar.png';
  };

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!userId) {
      console.error('Không tìm thấy userId');
      return;
    }
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post('/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
        profile_picture: response.data.url,
      });

      if (response.data.success && responseUpdatePictureLink.data.success) {
        const newAvatarUrl = response.data.url;
        dispatch(updateAvatar(newAvatarUrl));
        setAvatarUrl(newAvatarUrl);
        setIsModalOpen(false);
        setSnackbar({ open: true, message: 'Cập nhật ảnh đại diện thành công!' });
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setSnackbar({ open: true, message: 'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại!' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClosePage = () => {
    navigate('/');
  };

  const renderEditableField = (field: string, label: string) => {
    const { isEditing, value } = editableFields[field];

    return (
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1">{label}</Typography>
        {isEditing ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => saveField(field)}
                disabled={loading}
              >
                Lưu
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => cancelEditing(field)}
                disabled={loading}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ cursor: 'pointer' }} onClick={() => startEditing(field)}>
            <Typography variant="body1">{user[field] || 'Chưa cập nhật'}</Typography>
          </Box>
        )}
      </Paper>
    );
  };

  return (
    <Container sx={{ background: theme.palette.background.paper, p: 3 }}>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', minHeight: '100vh', bgcolor: 'grey.100' }}>
        <IconButton
          onClick={handleClosePage}
          sx={{ position: 'absolute', top: 16, right: { xs: -20, md: 50 }, bgcolor: 'grey.200', p: 1, borderRadius: '50%', '&:hover': { bgcolor: 'grey.300' } }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Section data={sections} onChange={(s) => handleSectionChange(s.section)} />
        <Box sx={{ width: { xs: '100%', md: '75%' }, p: 3, background: theme.palette.background.paper }}>
          {activeSection === 'personalInfo' && (
            <>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Thông tin cá nhân</Typography>
              <Typography variant="body2" sx={{ mb: 6, color: 'text.secondary' }}>Quản lý thông tin cá nhân của bạn.</Typography>
              <Box sx={{ mb: 12 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Thông tin cơ bản</Typography>
                <Typography variant="body2" sx={{ mb: 6, color: 'text.secondary' }}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Box sx={{ position: 'relative' }}>
                          <Box sx={{ width: 128, height: 128, borderRadius: '50%', overflow: 'hidden', border: '4px solid', borderColor: 'grey.100', boxShadow: 3 }}>
                            <img
                              src={avatarUrl}
                              onError={handleImageError}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s', opacity: isUploading ? 0.5 : 1 }}
                              alt={user?.name || 'Avatar'}
                            />
                            {isUploading && (
                              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'black', borderRadius: '50%', opacity: 0.5 }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>Đang tải...</Typography>
                              </Box>
                            )}
                          </Box>
                          <Button
                            onClick={handleAvatarClick}
                            sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'black', borderRadius: '50%', opacity: 0, transition: 'opacity 0.3s', '&:hover': { opacity: 0.4 } }}
                            aria-label="Change avatar"
                          >
                            <Typography variant="body2" sx={{ color: 'white' }}>Thay đổi ảnh</Typography>
                          </Button>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Ảnh hồ sơ</Typography>
                            <Typography variant="body2" color="textSecondary">Ảnh đại diện giúp người dùng dễ dàng nhận biết bạn hơn</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 3 }}>
                            <Button
                              variant="outlined"
                              onClick={handleAvatarClick}
                              startIcon={<AddPhotoAlternateIcon />}
                              sx={{ borderColor: '#6fe0dc', color: '#6fe0dc', '&:hover': { borderColor: '#58bcb9', bgcolor: '#f0fafa' } }}
                            >
                              Tải ảnh lên
                            </Button>
                            <Typography variant="caption" color="textSecondary">Định dạng: JPG, PNG (tối đa 1MB)</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('name', 'Họ và tên')}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('phone', 'Số điện thoại')}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('referring', 'Giới thiệu')}
                  </Grid>
                </Grid>
              </Box>
            </>
          )}

          {activeSection === 'securitySettings' && (
            <>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Mật khẩu và bảo mật</Typography>
              <Typography variant="body2" sx={{ mb: 10, color: 'text.secondary' }}>Cài đặt bảo mật tài khoản của bạn.</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper elevation={3} sx={{ p: 2, cursor: 'pointer' }} onClick={handleOpenPasswordModal}>
                  <Typography variant="body1">Đổi mật khẩu</Typography>
                  <Typography variant="body2" color="textSecondary">Bạn có muốn đổi mật khẩu chứ</Typography>
                </Paper>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <PasswordModal open={openPasswordModal} onClose={handleClosePasswordModal} onSave={handleSavePassword} />

      <AvatarUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentAvatarUrl={avatarUrl}
        onUpload={handleAvatarUpload}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default SettingUser;
