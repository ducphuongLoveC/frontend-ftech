export interface FormLoginValues {
    newPassword: string;
    confirmPassword: string;
}
interface ResetPasswordProps {
    isLoading: boolean;
    onSubmit: (values: FormLoginValues) => void;
}
declare const ResetPassword: React.FC<ResetPasswordProps>;
export default ResetPassword;
