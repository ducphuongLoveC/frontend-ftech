import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography } from '@mui/material';
import StarRatings from 'react-star-ratings';
const AverageRating = ({ totalUserRate, stars, totalStars, starRatedColor, starEmptyColor, }) => {
    if (totalStars < totalUserRate) {
        console.log('error star');
    }
    let averageRating = 0;
    if (totalStars > 0 && totalUserRate > 0) {
        averageRating = +(totalStars / totalUserRate).toFixed(1);
    }
    return (_jsxs(Box, { display: 'flex', alignItems: 'center', children: [_jsx(Typography, { color: '#f69c08', variant: "inherit", fontSize: "16px", fontWeight: "bold", mr: 1, mt: 0.5, children: averageRating }), _jsx(StarRatings, { rating: averageRating, starRatedColor: starRatedColor || '#f69c08', starEmptyColor: starEmptyColor || 'gray', starDimension: "14px" // Kích thước sao
                , starSpacing: "1px" // Khoảng cách giữa các sao
                , numberOfStars: stars, name: "averageRating" }), _jsxs(Typography, { ml: 1, children: ["(", totalUserRate, " \u0111\u00E1nh gi\u00E1)"] })] }));
};
export default AverageRating;
