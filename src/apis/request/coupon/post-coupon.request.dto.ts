export default interface PostCouponRequestDto{
    name: string;
    couponImage: String | null;
    amount: number;
    startDate: string;
    endDate: string;
}