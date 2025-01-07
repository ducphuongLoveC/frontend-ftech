interface ArtPlayerComponentProps {
    finished: boolean;
    videoUrl: string;
    poster?: string;
    onCompleted?: () => void;
    onTimeUpdate: (duration: number) => void;
}
declare const _default: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ArtPlayerComponentProps & import("react").RefAttributes<unknown>>>;
export default _default;
