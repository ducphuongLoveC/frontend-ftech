import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third-party
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '@/assets/images/icons/social-google.svg';
import { Link } from 'react-router-dom';
import path from '@/constants/routes';
import { RootState } from '@/store/reducer';

// ============================|| FIREBASE - LOGIN ||============================ //

export interface FormLoginValues {
  email: string;
  password: string;
}

interface AuthLoginProps {
  google?: boolean;
  onSubmit?: (values: FormLoginValues) => void;
  textElement?: React.ReactNode | string;
}

const MainInput = styled(OutlinedInput)(() => ({
  input: {
    color: 'black',
  },
}));

// Zod validation schema
const schema = z.object({
  email: z.string().email('Nhập đúng định dạng email').max(255, 'Email quá dài'),
  password: z.string().min(6, 'Mật khẩu đăng nhập phải hơn hoặc bằng 6 ký tự').max(255, 'Mật khẩu quá dài'),
});

const AuthLogin: React.FC<AuthLoginProps> = ({ textElement, google = false, onSubmit, ...others }) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state: RootState) => state.mainReducer);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const googleHandler = async () => {
    console.error('Login');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      {google && (
        <Grid container direction="column" justifyContent="center">
          <Grid item xs={12}>
            <AnimateButton>
              <Button disableElevation fullWidth onClick={googleHandler} size="large" variant="outlined">
                <Box
                  sx={{
                    mr: {
                      xs: 1,
                      sm: 2,
                      width: 20,
                    },
                  }}
                >
                  <img
                    src={Google}
                    alt="google"
                    width={16}
                    height={16}
                    style={{
                      marginRight: matchDownSM ? 8 : 16,
                    }}
                  />
                </Box>
                Đăng nhập với google
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Divider
                sx={{
                  flexGrow: 1,
                }}
                orientation="horizontal"
              />
              <Button
                variant="outlined"
                sx={{
                  cursor: 'unset',
                  m: 2,
                  py: 0.5,
                  px: 7,
                  borderColor: `${theme.palette.grey[100]} !important`,
                  color: `${theme.palette.grey[900]}!important`,
                  fontWeight: 500,
                  borderRadius: `${customization.borderRadius}px`,
                }}
                disableRipple
                disabled
              >
                Hoặc
              </Button>
              <Divider
                sx={{
                  flexGrow: 1,
                }}
                orientation="horizontal"
              />
            </Box>
          </Grid>
          <Grid item xs={12} container alignItems="center" justifyContent="center">
            <Box
              sx={{
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Đăng nhập với tài khoản hệ thống</Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      <form noValidate onSubmit={handleSubmit((data) => onSubmit && onSubmit(data))} {...others}>
        <FormControl
          fullWidth
          error={Boolean(errors.email)}
          sx={{
            ...theme.typography.customInput,
          }}
        >
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                id="outlined-adornment-email-login"
                type="email"
                label="Email Address / Username"
                inputProps={{}}
              />
            )}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors.password)}
          sx={{
            ...theme.typography.customInput,
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <MainInput
                {...field}
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
            )}
          />
          {errors.password && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Lưu cho lần đăng nhập sau"
          />
          <Link to={path.client.auth.forgetPass}>
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Quên mật khẩu?
            </Typography>
          </Link>
        </Stack>

        <Box
          sx={{
            mt: 2,
          }}
        >
          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                background: 'var(--color-primary)',
                color: '#fff',
                height: '45px',
              }}
            >
              {textElement}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
