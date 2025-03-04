import React from 'react'
import Header from '../MainLayout/Header'
import { Box } from '@mui/material'
import Footer from '../MainLayout/Footer'

import { useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
// interface BasicLayoutProps {
//   children: React.ReactNode;
// }
// const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
const BasicLayout: React.FC = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Header />
      <Box
        sx={{
          margin: 'auto',
          width: {
            sm: '100%',
            md: '90%',
          },
          [`@media (min-width:1600px)`]: {
            margin: 'auto',
          },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
export default BasicLayout;
