interface User {
    id: number;
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    profile_picture: string;
}
declare const useUsersAdmin: () => {
    rows: User[];
    loading: boolean;
    error: string | null;
};
export default useUsersAdmin;
