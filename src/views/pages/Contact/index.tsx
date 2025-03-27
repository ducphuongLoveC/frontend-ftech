import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, Typography, TextField, Button, Box, Grid, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Liên hệ
          </Typography>
          <Typography variant="body1" paragraph>
            Chúng tôi luôn lắng nghe và tiếp nhận mọi ý kiến đóng góp của bạn. Hãy liên hệ với chúng mình bằng cách điền
            thông tin vào form dưới đây. Chúng mình sẽ phản hồi bạn trong thời gian sớm nhất.
          </Typography>
        </CardContent>
      </Card>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton>
                <PhoneIcon />
              </IconButton>
              <Typography variant="body1">Điện thoại: 123-456-7890</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton>
                <LocationOnIcon />
              </IconButton>
              <Typography variant="body1">
                Địa chỉ: Tòa nhà FPT Polytechnic, Xuân Phương, Nam Từ Liêm, Hà Nội
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton>
                <EmailIcon />
              </IconButton>
              <Typography variant="body1">Email: email.com</Typography>
            </Box>
          </Box>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Họ và tên *"
                  margin="normal"
                  {...register('name', { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && 'Vui lòng nhập họ tên.'}
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...register('email', { required: true })}
                  error={!!errors.email}
                  helperText={errors.email && 'Vui lòng nhập email hợp lệ.'}
                />
                <TextField
                  fullWidth
                  label="Điện thoại"
                  margin="normal"
                  {...register('phone', { required: true })}
                  error={!!errors.phone}
                  helperText={errors.phone && 'Vui lòng nhập số điện thoại.'}
                />
                <TextField
                  fullWidth
                  label="Nội dung"
                  margin="normal"
                  multiline
                  rows={4}
                  {...register('message', { required: true })}
                  error={!!errors.message}
                  helperText={errors.message && 'Vui lòng nhập nội dung.'}
                />
                <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                  Gửi thông điệp
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8038408857424!2d105.7442910279369!3d21.040533417394226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1727749204759!5m2!1svi!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
