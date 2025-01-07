declare const reducer: import("redux").Reducer<{
    customization: {
        isOpen: any[];
        defaultId: string;
        fontFamily: string;
        borderRadius: number;
        opened: boolean;
        theme: string;
    } | {
        opened: any;
        isOpen: never[];
        defaultId: string;
        fontFamily: string;
        borderRadius: number;
        theme: string;
    } | {
        fontFamily: any;
        isOpen: never[];
        defaultId: string;
        borderRadius: number;
        opened: boolean;
        theme: string;
    } | {
        borderRadius: any;
        isOpen: never[];
        defaultId: string;
        fontFamily: string;
        opened: boolean;
        theme: string;
    } | {
        theme: any;
        isOpen: never[];
        defaultId: string;
        fontFamily: string;
        borderRadius: number;
        opened: boolean;
    };
    homeReducer: {
        theme: any;
        seek: undefined;
        isFirstPlayingVideo: boolean;
        expandedIndexs: number[];
    } | {
        expandedIndexs: any;
        seek: undefined;
        isFirstPlayingVideo: boolean;
        theme: string;
    } | {
        isFirstPlayingVideo: any;
        seek: undefined;
        theme: string;
        expandedIndexs: number[];
    } | {
        seek: any;
        isFirstPlayingVideo: boolean;
        theme: string;
        expandedIndexs: number[];
    };
    authReducer: {
        accessToken: any;
        user: import("./authReducer").User | null;
    } | {
        user: any;
        accessToken: string;
    };
}, any, Partial<{
    customization: {
        isOpen: never[];
        defaultId: string;
        fontFamily: string;
        borderRadius: number;
        opened: boolean;
        theme: string;
    } | undefined;
    homeReducer: {
        seek: undefined;
        isFirstPlayingVideo: boolean;
        theme: string;
        expandedIndexs: number[];
    } | undefined;
    authReducer: import("./authReducer").AuthState | undefined;
}>>;
export type RootState = ReturnType<typeof reducer>;
export default reducer;
