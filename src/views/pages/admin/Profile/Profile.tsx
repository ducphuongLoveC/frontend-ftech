// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/reducer';
// import clsx from 'clsx';
// import s from './Profile.module.scss';
// import axiosInstance from '@/api/axiosInstance';
// import { SET_USER } from '@/store/actions';
// import Cookies from 'js-cookie';
// import { Button } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import Loading from '@/ui-component/Loading';

// interface FormData {
//   id?: string;
//   _id?: string;
//   name: string;
//   phone: string;
//   profile_picture: string;
// }

// interface PasswordFormData {
//   currentPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// const Profile: React.FC = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.authReducer.user);

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     name: user?.name || '',
//     phone: user?.phone || '',
//     profile_picture: user?.profile_picture || '', // Thêm giá trị mặc định
//   });

//   // State cho phần đổi mật khẩu
//   const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [isChangingPassword, setIsChangingPassword] = useState(false);
//   const [passwordError, setPasswordError] = useState<string | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   useEffect(() => {
//     const userFromCookies = Cookies.get('user');
//     if (userFromCookies) {
//       const userObj = JSON.parse(userFromCookies);
//       dispatch({ type: SET_USER, payload: userObj });
//       console.log('Đã lấy thông tin người dùng từ cookies: ', userObj);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isEditing) {
//       console.log('Dữ liệu user được cập nhật: ', user);
//       setFormData({
//         name: user?.name || '',
//         phone: user?.phone || '',
//         profile_picture: user?.profile_picture || '',
//       });
//     }
//   }, [user, isEditing]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Reset error when user starts typing
//     setPasswordError(null);
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPasswordError(null);

//     // Validate password
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
//       return;
//     }

//     if (passwordForm.newPassword.length < 6) {
//       toast.error('Mật khẩu mới phải có ít nhất 6 ký tự');
//       return;
//     }

//     try {
//       const response = await axiosInstance.put('/api/user/change-password', passwordForm);

//       if (response.data.message) {
//         toast.success(response.data.message);
//         // Reset form sau khi đổi mật khẩu thành công
//         setPasswordForm({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: '',
//         });
//         setIsChangingPassword(false);
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
//     }
//   };

//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     const userId = user?._id || user?.id;

//     if (file && userId) {
//       const formData = new FormData();
//       formData.append('file', file);

//       setLoading(true);

//       const response = await axiosInstance.post('/api/media/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
//         profile_picture: response.data.url,
//       });

//       if (response.data.success && responseUpdatePictureLink.data.success) {
//         const uploadedImageUrl = response.data.url;

//         // Cập nhật formData
//         setFormData((prevData) => ({
//           ...prevData,
//           profile_picture: uploadedImageUrl,
//         }));

//         // Cập nhật user trong Redux và cookies
//         const updatedUser = { ...user, profile_picture: uploadedImageUrl };
//         dispatch({ type: SET_USER, payload: updatedUser });
//         Cookies.set('user', JSON.stringify(updatedUser), {
//           domain: 'admin.localhost',
//           expires: 7,
//         });
//         setLoading(false);
//       } else {
//         throw new Error(response.data.message || 'Upload failed');
//       }

//       // axiosInstance.put(`/api/user/${userId}`, formDataToSend, {
//       //     headers: {
//       //       'Content-Type': 'multipart/form-data',
//       //     },
//       //   })
//       //   .then((response) => {
//       //     // toast.success
//       //     if (response.data.success) {
//       //       const uploadedImageUrl = response.data.data.profile_picture;

//       //       // Cập nhật formData
//       //       setFormData((prevData) => ({
//       //         ...prevData,
//       //         profile_picture: uploadedImageUrl,
//       //       }));

//       //       // Cập nhật user trong Redux và cookies
//       //       const updatedUser = { ...user, profile_picture: uploadedImageUrl };
//       //       dispatch({ type: SET_USER, payload: updatedUser });
//       //       Cookies.set('user', JSON.stringify(updatedUser), {
//       //         domain: 'admin.localhost',
//       //         expires: 7,
//       //       });
//       //     }
//       //   })
//       //   .catch((error) => {
//       //     console.error('Lỗi khi upload ảnh: ', error);
//       //     toast.error('Có lỗi xảy ra khi upload ảnh!');
//       //   });
//     }
//   };
//   const handleSave = async () => {
//     if (!user?._id && !user?.id) {
//       setError('Không tìm thấy thông tin người dùng!');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const updatedData = {
//         name: formData.name,
//         phone: formData.phone,
//         profile_picture: formData.profile_picture,
//       };

//       const response = await axiosInstance.put(`/api/user/${user._id || user.id}`, updatedData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data.success) {
//         const updatedUser = { ...user, ...response.data.data };
//         dispatch({ type: SET_USER, payload: updatedUser });
//         Cookies.set('user', JSON.stringify(updatedUser), {
//           domain: 'admin.localhost',
//           expires: 7,
//         });

//         setIsEditing(false);
//         toast.success('Cập nhật thông tin thành công');
//       }
//     } catch (error: any) {
//       console.error('Lỗi khi cập nhật:', error);
//       setError('Có lỗi xảy ra, vui lòng thử lại!');
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="main-body">
//         <div className="row gutters-sm">
//           <div className="col-md-4 mb-3">
//             <div className="card">
//               <div className={clsx(s['card-body-user'])}>
//                 <div className="d-flex flex-column align-items-center text-center">
//                   <img
//                     src={formData.profile_picture || user.profile_picture}
//                     alt="Admin"
//                     className={clsx(s['rounded-circle'])}
//                     width={150}
//                   />
//                   <div className="mt-3">
//                     <h4>{formData.name}</h4>
//                     <p className="mb-1">{user.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-8">
//             {/* Card thông tin cá nhân */}
//             <div className="card mb-3">
//               <div className={clsx(s['card-body'])}>
//                 <div className="row align-items-center">
//                   <div className="col-sm-3">
//                     <h6 className="mb-10">Họ và tên:</h6>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="form-control"
//                       />
//                     ) : (
//                       <span>{formData.name}</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

//                 <div className="row align-items-center">
//                   <div className="col-sm-3">
//                     <h6 className="mb-10">Phone:</h6>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="form-control"
//                       />
//                     ) : (
//                       <span>{formData.phone}</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

//                 <div className="row align-items-center">
//                   <div className="col-sm-3">
//                     <h6 className="mb-10">Email:</h6>
//                   </div>
//                   <div className="col-sm-9">
//                     <span>{user.email}</span>
//                   </div>
//                 </div>
//                 <hr />

//                 <div className="row align-items-center">
//                   <div className="col-sm-3">
//                     <h6 className="mb-10">Ảnh đại diện:</h6>
//                   </div>
//                   <div className="col-sm-9">
//                     {isEditing ? (
//                       <input type="file" onChange={handleImageChange} className="form-control" />
//                     ) : (
//                       <span>Ảnh hiện tại đã được lưu</span>
//                     )}
//                   </div>
//                 </div>
//                 <hr />

//                 {error && <div className="alert alert-danger">{error}</div>}

//                 {isEditing ? (
//                   <Button
//                     color="primary"
//                     variant="outlined"
//                     className={clsx(s['button-edit-profile'])}
//                     onClick={handleSave}
//                     disabled={loading}
//                   >
//                     {loading ? 'Đang lưu...' : 'Lưu'}
//                   </Button>
//                 ) : (
//                   <Button
//                     color="primary"
//                     variant="outlined"
//                     className={clsx(s['button-edit-profile'])}
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Sửa
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {/* Card đổi mật khẩu */}
//             <div className="card">
//               <div className={clsx(s['card-body'])}>
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h6 className="mb-0">Đổi mật khẩu</h6>
//                   <Button
//                     color="primary"
//                     variant="outlined"
//                     className={clsx(s['button-edit-profile'])}
//                     onClick={() => {
//                       setIsChangingPassword(!isChangingPassword);
//                       setPasswordError(null);
//                       setPasswordForm({
//                         currentPassword: '',
//                         newPassword: '',
//                         confirmPassword: '',
//                       });
//                     }}
//                   >
//                     {isChangingPassword ? 'Hủy' : 'Đổi mật khẩu'}
//                   </Button>
//                 </div>

//                 {isChangingPassword && (
//                   <form onSubmit={handlePasswordChange}>
//                     <div className="form-group mb-3">
//                       <label>Mật khẩu hiện tại:</label>
//                       <input
//                         type="password"
//                         name="currentPassword"
//                         value={passwordForm.currentPassword}
//                         onChange={handlePasswordFormChange}
//                         className="form-control"
//                         required
//                       />
//                     </div>
//                     <div className="form-group mb-3">
//                       <label>Mật khẩu mới:</label>
//                       <input
//                         type="password"
//                         name="newPassword"
//                         value={passwordForm.newPassword}
//                         onChange={handlePasswordFormChange}
//                         className="form-control"
//                         required
//                       />
//                     </div>
//                     <div className="form-group mb-3">
//                       <label>Xác nhận mật khẩu mới:</label>
//                       <input
//                         type="password"
//                         name="confirmPassword"
//                         value={passwordForm.confirmPassword}
//                         onChange={handlePasswordFormChange}
//                         className="form-control"
//                         required
//                       />
//                     </div>
//                     {passwordError && <div className="alert alert-danger">{passwordError}</div>}
//                     <Button variant="outlined" type="submit" className={clsx(s['button-edit-profile'])}>
//                       Xác nhận đổi mật khẩu
//                     </Button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {loading && <Loading />}

//       <ToastContainer />
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducer';
import axiosInstance from '@/api/axiosInstance';
import { SET_USER } from '@/store/actions';
import Cookies from 'js-cookie';
import { Button, Typography, TextField, Paper, Avatar, Box, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '@/ui-component/Loading';

interface FormData {
  id?: string;
  _id?: string;
  name: string;
  phone: string;
  profile_picture: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    phone: user?.phone || '',
    profile_picture: user?.profile_picture || '',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const userFromCookies = Cookies.get('user');
    if (userFromCookies) {
      const userObj = JSON.parse(userFromCookies);
      dispatch({ type: SET_USER, payload: userObj });
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        name: user?.name || '',
        phone: user?.phone || '',
        profile_picture: user?.profile_picture || '',
      });
    }
  }, [user, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError(null);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    try {
      const response = await axiosInstance.put('/api/user/change-password', passwordForm);

      if (response.data.message) {
        toast.success(response.data.message);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setIsChangingPassword(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const userId = user?._id || user?.id;

    if (file && userId) {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);

      const response = await axiosInstance.post('/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseUpdatePictureLink = await axiosInstance.put(`/api/user/${userId}`, {
        profile_picture: response.data.url,
      });

      if (response.data.success && responseUpdatePictureLink.data.success) {
        const uploadedImageUrl = response.data.url;

        setFormData((prevData) => ({
          ...prevData,
          profile_picture: uploadedImageUrl,
        }));

        const updatedUser = { ...user, profile_picture: uploadedImageUrl };
        dispatch({ type: SET_USER, payload: updatedUser });
        Cookies.set('user', JSON.stringify(updatedUser), {
          domain: 'admin.localhost',
          expires: 7,
        });
        setLoading(false);
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    }
  };

  const handleSave = async () => {
    if (!user?._id && !user?.id) {
      setError('Không tìm thấy thông tin người dùng!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        profile_picture: formData.profile_picture,
      };

      const response = await axiosInstance.put(`/api/user/${user._id || user.id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.data };
        dispatch({ type: SET_USER, payload: updatedUser });
        Cookies.set('user', JSON.stringify(updatedUser), {
          domain: 'admin.localhost',
          expires: 7,
        });

        setIsEditing(false);
        toast.success('Cập nhật thông tin thành công');
      }
    } catch (error: any) {
      console.error('Lỗi khi cập nhật:', error);
      setError('Có lỗi xảy ra, vui lòng thử lại!');
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={formData.profile_picture || user.profile_picture}
              alt="Admin"
              sx={{ width: 150, height: 150, mx: 'auto' }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {formData.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.role}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Thông tin cá nhân
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Họ và tên:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                {isEditing ? (
                  <TextField fullWidth name="name" value={formData.name} onChange={handleInputChange} />
                ) : (
                  <Typography>{formData.name}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Phone:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                {isEditing ? (
                  <TextField fullWidth name="phone" value={formData.phone} onChange={handleInputChange} />
                ) : (
                  <Typography>{formData.phone}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Email:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>{user.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Ảnh đại diện:</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                {isEditing ? (
                  <input type="file" onChange={handleImageChange} />
                ) : (
                  <Typography>Ảnh hiện tại đã được lưu</Typography>
                )}
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 3 }}>
              {isEditing ? (
                <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                  {loading ? 'Đang lưu...' : 'Lưu'}
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                  Sửa
                </Button>
              )}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6">Đổi mật khẩu</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsChangingPassword(!isChangingPassword);
                  setPasswordError(null);
                  setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  });
                }}
              >
                {isChangingPassword ? 'Hủy' : 'Đổi mật khẩu'}
              </Button>
            </Box>

            {isChangingPassword && (
              <form onSubmit={handlePasswordChange}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu hiện tại"
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mật khẩu mới"
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Xác nhận mật khẩu mới"
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordFormChange}
                      required
                    />
                  </Grid>
                  {passwordError && (
                    <Grid item xs={12}>
                      <Typography color="error">{passwordError}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" color="primary">
                      Xác nhận đổi mật khẩu
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>

      {loading && <Loading />}
      <ToastContainer />
    </Box>
  );
};

export default Profile;
