export interface User {
    _id?: string;
    id?: string;
    name?: string;
    nickname?: string;
    profile_picture: string;
    referring?: string;
    avatar?: string;
    fa?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
export interface AuthState {
    accessToken: string;
    user: User | null;
}
declare const authReducer: (state: AuthState | undefined, action: any) => {
    accessToken: any;
    user: User | null;
} | {
    user: any;
    accessToken: string;
};
export default authReducer;
