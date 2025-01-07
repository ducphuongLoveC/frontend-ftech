import React from 'react';
export interface FormLoginValues {
    email: string;
    password: string;
}
interface AuthLoginProps {
    google?: boolean;
    onSubmit?: (values: FormLoginValues) => void;
}
declare const AuthLogin: React.FC<AuthLoginProps>;
export default AuthLogin;
