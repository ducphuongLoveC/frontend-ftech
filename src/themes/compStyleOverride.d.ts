export default function componentStyleOverrides(theme: any): {
    MuiButton: {
        styleOverrides: {
            root: {
                fontWeight: number;
                borderRadius: string;
            };
        };
    };
    MuiPaper: {
        defaultProps: {
            elevation: number;
        };
        styleOverrides: {
            root: {
                backgroundImage: string;
            };
            rounded: {
                borderRadius: string;
            };
        };
    };
    MuiCardHeader: {
        styleOverrides: {
            root: {
                color: any;
                padding: string;
            };
            title: {
                fontSize: string;
            };
        };
    };
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: string;
            };
        };
    };
    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: string;
            };
        };
    };
    MuiListItemButton: {
        styleOverrides: {
            root: {
                color: any;
                paddingTop: string;
                paddingBottom: string;
                '&.Mui-selected': {
                    color: any;
                    backgroundColor: any;
                    '&:hover': {
                        backgroundColor: any;
                    };
                    '& .MuiListItemIcon-root': {
                        color: any;
                    };
                };
                '&:hover': {
                    backgroundColor: any;
                    color: any;
                    '& .MuiListItemIcon-root': {
                        color: any;
                    };
                };
            };
        };
    };
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                color: any;
                minWidth: string;
            };
        };
    };
    MuiListItemText: {
        styleOverrides: {
            primary: {
                color: any;
            };
        };
    };
    MuiInputBase: {
        styleOverrides: {
            input: {
                color: any;
                '&::placeholder': {
                    color: any;
                    fontSize: string;
                };
            };
        };
    };
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                background: any;
                borderRadius: string;
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: any;
                };
                '&:hover $notchedOutline': {
                    borderColor: any;
                };
                '&.MuiInputBase-multiline': {
                    padding: number;
                };
            };
            input: {
                fontWeight: number;
                background: any;
                padding: string;
                borderRadius: string;
                '&.MuiInputBase-inputSizeSmall': {
                    padding: string;
                    '&.MuiInputBase-inputAdornedStart': {
                        paddingLeft: number;
                    };
                };
            };
            inputAdornedStart: {
                paddingLeft: number;
            };
            notchedOutline: {
                borderRadius: string;
            };
        };
    };
    MuiSlider: {
        styleOverrides: {
            root: {
                '&.Mui-disabled': {
                    color: any;
                };
            };
            mark: {
                backgroundColor: any;
                width: string;
            };
            valueLabel: {
                color: any;
            };
        };
    };
    MuiDivider: {
        styleOverrides: {
            root: {
                borderColor: any;
                opacity: number;
            };
        };
    };
    MuiAvatar: {
        styleOverrides: {
            root: {
                color: any;
                background: any;
            };
        };
    };
    MuiChip: {
        styleOverrides: {
            root: {
                '&.MuiChip-deletable .MuiChip-deleteIcon': {
                    color: string;
                };
            };
        };
    };
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                color: any;
                background: any;
            };
        };
    };
};
