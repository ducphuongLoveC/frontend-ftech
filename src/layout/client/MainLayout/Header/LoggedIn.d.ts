interface UserProp {
    user: {
        _id: string;
        name: string;
        email: string;
        nickname: string;
        profile_picture?: string;
        role?: string;
    };
}
declare const LoggedIn: React.FC<UserProp>;
export default LoggedIn;
