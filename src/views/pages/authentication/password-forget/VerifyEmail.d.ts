export interface FormLoginValues {
    email: string;
    password: string;
}
interface VerifyEmailProps {
    isLoading: boolean;
    onSubmit?: (values: FormLoginValues) => void;
}
declare const VerifyEmail: React.FC<VerifyEmailProps>;
export default VerifyEmail;
