interface CourseItemProp {
    thumbnail: string;
    title: string;
    postUser: string;
    price: string | number;
    salePrice: number;
    totalUserRate: number;
    totalStars: number;
    stars: number;
    to: string;
    isFree: boolean;
}
declare const CourseItem: React.FC<CourseItemProp>;
export default CourseItem;
