import React from 'react';
import { z } from 'zod';
declare const schema: z.ZodObject<{
    fname: z.ZodString;
    lname: z.ZodString;
    email: z.ZodString;
    isVerifyOtp: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fname: string;
    lname: string;
    email: string;
    isVerifyOtp: boolean;
    password: string;
}, {
    fname: string;
    lname: string;
    email: string;
    isVerifyOtp: boolean;
    password: string;
}>;
export type AuthRegisterData = z.infer<typeof schema>;
interface AuthRegisterProps {
    onSubmit: (data: AuthRegisterData) => void;
}
declare const AuthRegister: React.FC<AuthRegisterProps>;
export default AuthRegister;
