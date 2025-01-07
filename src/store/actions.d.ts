declare const SET_MENU = "@customization/SET_MENU";
declare const MENU_TOGGLE = "@customization/MENU_TOGGLE";
declare const MENU_OPEN = "@customization/MENU_OPEN";
declare const SET_FONT_FAMILY = "@customization/SET_FONT_FAMILY";
declare const SET_BORDER_RADIUS = "@customization/SET_BORDER_RADIUS";
declare const TOGGLE_THEME = "@customization/TOGGLE_THEME";
declare const TOGGLE_THEME_HOME = "@home/TOGGLE_THEME";
declare const SET_EXPANDED_INDEXS = "@/home/SET_EXPANDED_INDEXS";
declare const SET_IS_FIRST_PLAYING_VIDEO = "@/home/SET_IS_FIRST_PLAYING_VIDEO";
declare const SET_SEEK = "@/home/SET_SEEK";
declare const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
declare const SET_USER = "SET_USER";
export declare const UPDATE_USER = "UPDATE_USER";
export declare const UPDATE_AVATAR = "UPDATE_AVATAR";
export { SET_MENU, MENU_TOGGLE, MENU_OPEN, SET_FONT_FAMILY, SET_BORDER_RADIUS, TOGGLE_THEME, TOGGLE_THEME_HOME, SET_USER, SET_ACCESS_TOKEN, SET_EXPANDED_INDEXS, SET_IS_FIRST_PLAYING_VIDEO, SET_SEEK, };
export declare const updateUser: (userData: Partial<any>) => {
    type: string;
    payload: Partial<any>;
};
export declare const updateAvatar: (avatarUrl: string) => {
    type: string;
    payload: string;
};
