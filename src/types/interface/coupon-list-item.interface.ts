export default interface CouponListItem {
    id: number;
    name: string;
    amount: number;
    startDate: string;
    endDate: string;
    couponImage: string | null;
}