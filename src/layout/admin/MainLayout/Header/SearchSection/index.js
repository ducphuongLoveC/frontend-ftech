import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, forwardRef } from 'react';
// material-ui
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
// project imports
import Transitions from '@/ui-component/extended/Transitions';
// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX, } from '@tabler/icons-react';
const HeaderAvatar = forwardRef(({ children, ...others }, ref) => {
    const theme = useTheme();
    return (_jsx(Avatar, { ref: ref, variant: "rounded", sx: {
            color: theme.palette.text.primary,
            background: 'none',
            cursor: 'pointer',
            '&:hover': {
                background: theme.palette.background.paper2,
            },
        }, ...others, children: children }));
});
const MobileSearch = ({ value, setValue, popupState, }) => {
    return (_jsx(OutlinedInput, { id: "input-search-header", value: value, onChange: (e) => setValue(e.target.value), placeholder: "Search", startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(IconSearch, { stroke: 1.5, size: "16px" }) }), endAdornment: _jsxs(InputAdornment, { position: "end", children: [_jsx(HeaderAvatar, { children: _jsx(IconAdjustmentsHorizontal, { stroke: 1.5, size: "20px" }) }), _jsx(Box, { sx: {
                        ml: 2,
                    }, children: _jsx(Avatar, { variant: "rounded", sx: {
                            // ...theme.typography.commonAvatar,
                            // ...theme.typography.mediumAvatar,
                            bgcolor: 'orange.light',
                            color: 'orange.dark',
                            '&:hover': {
                                bgcolor: 'orange.dark',
                                color: 'orange.light',
                            },
                        }, ...bindToggle(popupState), children: _jsx(IconX, { stroke: 1.5, size: "20px" }) }) })] }), "aria-describedby": "search-helper-text", inputProps: {
            'aria-label': 'weight',
            sx: {
                bgcolor: 'transparent',
                pl: 0.5,
            },
        }, sx: {
            width: '100%',
            ml: 0.5,
            px: 2,
            bgcolor: 'background.paper',
        } }));
};
// ==============================|| SEARCH INPUT ||============================== //
const SearchSection = () => {
    const [value, setValue] = useState('');
    return (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                }, children: _jsx(PopupState, { variant: "popper", popupId: "demo-popup-popper", children: (popupState) => (_jsxs(_Fragment, { children: [_jsx(Box, { sx: {
                                    ml: 2,
                                }, children: _jsx(HeaderAvatar, { ...bindToggle(popupState), children: _jsx(IconSearch, { stroke: 1.5, size: "19.2px" }) }) }), _jsx(Popper, { ...bindPopper(popupState), transition: true, sx: {
                                    zIndex: 1100,
                                    width: '99%',
                                    top: '-55px !important',
                                    px: {
                                        xs: 1.25,
                                        sm: 1.5,
                                    },
                                }, children: ({ TransitionProps }) => (_jsx(_Fragment, { children: _jsx(Transitions, { type: "zoom", ...TransitionProps, sx: {
                                            transformOrigin: 'center left',
                                        }, children: _jsx(Card, { sx: {
                                                bgcolor: 'background.default',
                                                border: 0,
                                                boxShadow: 'none',
                                            }, children: _jsx(Box, { sx: {
                                                    p: 2,
                                                }, children: _jsx(Grid, { container: true, alignItems: "center", justifyContent: "space-between", children: _jsx(Grid, { item: true, xs: true, children: _jsx(MobileSearch, { value: value, setValue: setValue, popupState: popupState }) }) }) }) }) }) })) })] })) }) }), _jsx(Box, { sx: {
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                }, children: _jsx(OutlinedInput, { id: "input-search-header", value: value, onChange: (e) => setValue(e.target.value), placeholder: "Search", startAdornment: _jsx(InputAdornment, { position: "start", children: _jsx(IconSearch, { stroke: 1.5, size: "16px" }) }), endAdornment: _jsx(InputAdornment, { position: "end", children: _jsx(HeaderAvatar, { children: _jsx(IconAdjustmentsHorizontal, { stroke: 1.5, size: "20px" }) }) }), "aria-describedby": "search-helper-text", inputProps: {
                        'aria-label': 'weight',
                        sx: {
                            bgcolor: 'transparent',
                            pl: 0.5,
                        },
                    }, sx: {
                        width: {
                            md: 250,
                            lg: 434,
                        },
                        ml: 2,
                        px: 2,
                    } }) })] }));
};
export default SearchSection;
