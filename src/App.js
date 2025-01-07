import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from '@/themes';
// project imports
import { router } from '@/routes';
const App = () => {
    const state = useSelector((state) => (window.location.hostname.startsWith('admin') ? state.customization : state.homeReducer), (prev, next) => prev === next);
    return (_jsx(StyledEngineProvider, { injectFirst: true, children: _jsxs(ThemeProvider, { theme: themes(state), children: [_jsx(CssBaseline, {}), _jsx("div", { children: router })] }) }));
};
export default App;
