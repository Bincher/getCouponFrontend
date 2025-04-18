export default interface Coupon {
    name: string;
    couponImage: string | null;
    amount: number;
    startDate: string;
    endDate: string;
}