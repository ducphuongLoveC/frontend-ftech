export declare const initialState: {
    seek: undefined;
    isFirstPlayingVideo: boolean;
    theme: string;
    expandedIndexs: number[];
};
declare const homeReducer: (state: {
    seek: undefined;
    isFirstPlayingVideo: boolean;
    theme: string;
    expandedIndexs: number[];
} | undefined, action: any) => {
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
export default homeReducer;
