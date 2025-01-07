import React from 'react';
interface SliderProps {
    _id: string;
    title: string;
    description: string;
    image: string;
    path: string;
    background: string;
}
interface CarouselProps {
    time?: number;
    dot?: boolean;
    auto?: boolean;
    sliders: SliderProps[];
}
declare const Carousel: React.FC<CarouselProps>;
export default Carousel;
