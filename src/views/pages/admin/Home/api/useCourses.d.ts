interface Course {
    _id: string;
    title: string;
    description: string;
    original_price: number;
    sale_price: number;
    enrollment_count: number;
    isActive: boolean;
    thumbnail: string;
    createdAt: string;
}
declare const useCourses: () => {
    courses: Course[];
    loading: boolean;
    error: string | null;
};
export default useCourses;
