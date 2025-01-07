/**
 * Typography used in theme
 * @param {JsonObject} theme theme state object
 */
export default function themeTypography(theme: any): {
    fontFamily: any;
    _h6: {
        fontWeight: number;
        color: any;
        fontSize: string;
    };
    h6: {
        fontWeight: number;
        color: any;
        fontSize: string;
    };
    h5: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    h4: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    h3: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    h2: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    h1: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    subtitle1: {
        fontSize: string;
        fontWeight: number;
        color: any;
    };
    subtitle2: {
        fontSize: string;
        fontWeight: number;
        color: any;
    };
    caption: {
        fontSize: string;
        color: any;
        fontWeight: number;
    };
    body1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: string;
    };
    body2: {
        letterSpacing: string;
        fontWeight: number;
        lineHeight: string;
        color: any;
    };
    button: {
        textTransform: string;
    };
    customInput: {
        marginTop: number;
        marginBottom: number;
        '& > label': {
            top: number;
            left: number;
            color: any;
            '&[data-shrink="false"]': {
                top: number;
            };
        };
        '& > div > input': {
            padding: string;
        };
        '& legend': {
            display: string;
        };
        '& fieldset': {
            top: number;
        };
    };
    mainContent: {
        backgroundColor: any;
        width: string;
        minHeight: string;
        flexGrow: number;
        padding: string;
        marginTop: string;
        marginRight: string;
        borderRadius: string;
    };
    menuCaption: {
        fontSize: string;
        fontWeight: number;
        color: any;
        padding: string;
        textTransform: string;
        marginTop: string;
    };
    subMenuCaption: {
        fontSize: string;
        fontWeight: number;
        color: any;
        textTransform: string;
    };
    commonAvatar: {
        cursor: string;
        borderRadius: string;
    };
    smallAvatar: {
        width: string;
        height: string;
        fontSize: string;
    };
    mediumAvatar: {
        width: string;
        height: string;
        fontSize: string;
    };
    largeAvatar: {
        width: string;
        height: string;
        fontSize: string;
    };
};
