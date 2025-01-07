import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SET_BORDER_RADIUS, SET_FONT_FAMILY, TOGGLE_THEME } from '@/store/actions';
import { gridSpacing } from '@/store/constant';
import SubCard from '@/ui-component/cards/SubCard';
import { Drawer, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Switch, Typography, useTheme, Slider, } from '@mui/material';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
function valueText(value) {
    return `${value}px`;
}
const DrawerSetting = ({ open, onClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    // state - border radius
    const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
    const handleBorderRadius = (_event, newValue) => {
        if (typeof newValue === 'number') {
            setBorderRadius(newValue);
        }
    };
    useEffect(() => {
        dispatch({
            type: SET_BORDER_RADIUS,
            borderRadius,
        });
    }, [dispatch, borderRadius]);
    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }
    // state - font family
    const [fontFamily, setFontFamily] = useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({
            type: SET_FONT_FAMILY,
            fontFamily: newFont,
        });
    }, [dispatch, fontFamily]);
    // state - theme
    const [themeMode, setThemeMode] = useState('light');
    const handleToggleThemeMode = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
    };
    useEffect(() => {
        dispatch({
            type: TOGGLE_THEME,
            theme: themeMode,
        });
    }, [dispatch, themeMode]);
    return (_jsx(Drawer, { anchor: "right", onClose: onClose, open: open, PaperProps: {
            sx: {
                width: '50%',
            },
        }, children: _jsx(PerfectScrollbar, { component: "div", children: _jsxs(Grid, { container: true, spacing: gridSpacing, sx: {
                    p: 3,
                }, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(SubCard, { title: "Font Family", children: _jsx(FormControl, { children: _jsxs(RadioGroup, { "aria-label": "font-family", value: fontFamily, onChange: (e) => setFontFamily(e.target.value), name: "row-radio-buttons-group", children: [_jsx(FormControlLabel, { value: "Roboto", control: _jsx(Radio, {}), label: "Roboto", sx: {
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label': {
                                                    color: theme.palette.grey[900],
                                                },
                                            } }), _jsx(FormControlLabel, { value: "Poppins", control: _jsx(Radio, {}), label: "Poppins", sx: {
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label': {
                                                    color: theme.palette.grey[900],
                                                },
                                            } }), _jsx(FormControlLabel, { value: "Inter", control: _jsx(Radio, {}), label: "Inter", sx: {
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28,
                                                },
                                                '& .MuiFormControlLabel-label': {
                                                    color: theme.palette.grey[900],
                                                },
                                            } })] }) }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SubCard, { title: "Border Radius", children: _jsxs(Grid, { item: true, xs: 12, container: true, spacing: 2, alignItems: "center", sx: {
                                    mt: 2.5,
                                }, children: [_jsx(Grid, { item: true, children: _jsx(Typography, { variant: "h6", color: "secondary", children: "4px" }) }), _jsx(Grid, { item: true, xs: true, children: _jsx(Slider, { size: "small", value: borderRadius, onChange: handleBorderRadius, getAriaValueText: valueText, valueLabelDisplay: "on", "aria-labelledby": "discrete-slider-small-steps", marks: true, step: 2, min: 4, max: 24, color: "secondary", sx: {
                                                '& .MuiSlider-valueLabel': {
                                                    color: 'secondary.light',
                                                },
                                            } }) }), _jsx(Grid, { item: true, children: _jsx(Typography, { variant: "h6", color: "secondary", children: "24px" }) })] }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(SubCard, { title: "Theme", children: _jsx(FormControl, { children: _jsx(FormControlLabel, { control: _jsx(Switch, { checked: themeMode === 'dark', onChange: handleToggleThemeMode }), label: themeMode === 'light' ? 'Light Mode' : 'Dark Mode' }) }) }) })] }) }) }));
};
export default DrawerSetting;
