declare module '@mui/material/styles' {
    interface TypeBackground {
        paper2: string;
    }
    interface Palette {
        border: {
            borderLv1: string;
            borderLv2: string;
            default: string;
        };
    }
    interface PaletteOptions {
        border?: {
            borderLv1?: string;
            borderLv2?: string;
            default?: string;
        };
        background?: Partial<TypeBackground>;
    }
}
export default function themePalette(theme: any): {
    mode: any;
    common: {
        black: any;
    };
    primary: {
        light: any;
        main: any;
        dark: any;
        200: any;
        800: any;
    };
    secondary: {
        light: any;
        main: any;
        dark: any;
        200: any;
        800: any;
    };
    error: {
        light: any;
        main: any;
        dark: any;
    };
    orange: {
        light: any;
        main: any;
        dark: any;
    };
    warning: {
        light: any;
        main: any;
        dark: any;
    };
    success: {
        light: any;
        200: any;
        main: any;
        dark: any;
    };
    grey: {
        50: any;
        100: any;
        500: any;
        600: any;
        700: any;
        900: any;
    };
    dark: {
        light: any;
        main: any;
        dark: any;
        800: any;
        900: any;
    };
    text: {
        primary: any;
        secondary: any;
        dark: any;
        hint: any;
    };
    border: {
        borderLv1: any;
        borderLv2: any;
        default: any;
    };
    background: {
        paper: any;
        paper2: any;
        default: any;
    };
};
