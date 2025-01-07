interface FormCouponProps {
    textBtn: string;
    values?: any;
    onSubmit: (data: any) => void;
    onClose: () => void;
    courses: any;
}
declare const FormCoupon: React.FC<FormCouponProps>;
export default FormCoupon;
