interface RatingPreviewProps {
    user_id?: string;
    comments: any;
    ratingCounts: number[];
    mode: 'view' | 'edit';
    onChange?: (newRating: number, newComment: string) => void;
}
export declare const RatingPreview: React.FC<RatingPreviewProps>;
export default RatingPreview;
