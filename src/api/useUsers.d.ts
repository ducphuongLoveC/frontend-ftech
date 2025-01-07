export interface User {
    id: number;
    _id: string;
    name: string;
    email: string;
    refering: string;
    profile_picture: string;
    phone: string;
    address: string;
    role: string;
}
declare const useUsers: () => {
    rows: User[];
    loading: boolean;
    error: string | null;
};
export default useUsers;
