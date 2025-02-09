import { useSelector } from 'react-redux'

import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// defaultTheme
import themes from '@/themes'

// project imports
// import { router } from '@/routes';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ElementsRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { RootState } from './store/reducer'

const App: React.FC = () => {
  const globalState = useSelector((state: RootState) => state.mainReducer)
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(globalState)}>
        <CssBaseline />
        {/* <div>{router}</div> */}

        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>home</h1>} />
            <Route path="/login" element={<h1>login</h1>} />
          </Routes>
        </BrowserRouter> */}
        <BrowserRouter>
          <ElementsRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
export default App
