import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, IconButton, InputBase, useMediaQuery, styled, useTheme, Paper } from '@mui/material'
import { BiAdjust, BiX } from 'react-icons/bi'
import Tippy from '@tippyjs/react'
import HeadlessTippy from '@tippyjs/react/headless'

import Logo from '@/ui-component/Logo'
import Wrapper from '@/components/Wrapper'
import { TOGGLE_THEME } from '@/store/actions'
import useDebounce from '@/hooks/useDebounce'
import { BeatLoader, SkewLoader } from 'react-spinners'
import LoggedIn from './LoggedIn'
import NotLoggedIn from './NotLoggedIn'
import { RootState } from '@/store/reducer'
import { getCourseSearch } from '@/api/courseApi'
import path from '@/constants/routes'
import SearchIcon from '@mui/icons-material/Search'

const ContentSearch = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '5px 10px',
}))

const ImageContentSearch = styled('img')({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  marginRight: '10px',
})

const Header = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const homeState = useSelector((state: RootState) => state.mainReducer)
  const authState = useSelector((state: RootState) => state.authReducer)

  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const debounced = useDebounce(searchValue, 500)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await getCourseSearch(searchValue)
        setDataSearch(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    if (searchValue) {
      fetchData()
    }
  }, [debounced])

  const handleToggleThemeMode = () => {
    const newTheme = homeState.theme === 'light' ? 'dark' : 'light'
    dispatch({ type: TOGGLE_THEME, theme: newTheme })
  }

  const handleSearchValue = (value: string) => {
    if (!value.startsWith(' ')) {
      setSearchValue(value)
    }
  }

  const clearSearchValue = () => setSearchValue('')
  const downMD = useMediaQuery(theme.breakpoints.down('md'))
  const downSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        bgcolor: theme.palette.background.paper,
        py: 1,
      }}
    >
      {authState.user?.role === 'admin' && (
        <Box
          sx={{
            bgcolor: theme.palette.background.paper2,
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Xin chào admin {authState.user.name}!</Typography>
          <Link to="/admin">Đăng nhập vào quản trị nội dung</Link>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: downMD ? '100%' : '90%',
          mx: 'auto',
        }}
      >
        {!downSM && (
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
            <Typography fontWeight="bold"  display={'flex'} alignItems={'center'}>Lập trình Ftech <SkewLoader  size={7} cssOverride={{marginLeft:'5px'}} /></Typography>
          </Link>
        )}

        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: downSM ? '100%' : '33%',
            p: '2px 8px',
            borderRadius: '20px',
            border: '1px solid',
            borderColor: theme.palette.divider,
            py: 0.5,
            marginLeft: { xs: '10px' },
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <HeadlessTippy
            visible={searchValue.length > 0}
            placement="top-start"
            interactive
            render={(attrs) => (
              <Wrapper
                sx={{
                  bgcolor: theme.palette.background.paper,
                  width: '100%',
                  maxHeight: '70vh',
                  overflow: 'auto',
                }}
                {...attrs}
              >
                {isLoading ? (
                  <Typography>Đang tìm '{searchValue}'</Typography>
                ) : dataSearch.length > 0 ? (
                  dataSearch.map((course: any) => (
                    <Link key={course._id} to={path.client.learningId(course._id)}>
                      <ContentSearch>
                        <ImageContentSearch src={course.thumbnail} />
                        <Typography>{course.title}</Typography>
                      </ContentSearch>
                    </Link>
                  ))
                ) : (
                  <Typography>Không tìm thấy kết quả cho '{searchValue}'</Typography>
                )}
              </Wrapper>
            )}
          >
            <InputBase value={searchValue} onChange={(e) => handleSearchValue(e.target.value)} placeholder="Tìm kiếm khóa học" sx={{ flex: 1 }} />
          </HeadlessTippy>

          {isLoading ? (
            <BeatLoader color={theme.palette.text.primary} size={6} />
          ) : (
            searchValue && (
              <IconButton onClick={clearSearchValue} size="small">
                <BiX />
              </IconButton>
            )
          )}
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tippy content="Thay đổi theme">
            <IconButton onClick={handleToggleThemeMode}>
              <BiAdjust style={{ color: theme.palette.text.primary }} />
            </IconButton>
          </Tippy>
          {authState?.accessToken ? <LoggedIn user={authState.user} /> : <NotLoggedIn />}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
