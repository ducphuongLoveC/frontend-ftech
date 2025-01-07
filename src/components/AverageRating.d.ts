import React from 'react';
interface AverageRatingProps {
    totalUserRate: number;
    stars: number;
    totalStars: number;
    starRatedColor?: string;
    starEmptyColor?: string;
}
declare const AverageRating: React.FC<AverageRatingProps>;
export default AverageRating;
