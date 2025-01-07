interface CouponListProps {
    coupons: any;
    onChange: (code: string) => void;
}
declare const CouponList: React.FC<CouponListProps>;
export default CouponList;
