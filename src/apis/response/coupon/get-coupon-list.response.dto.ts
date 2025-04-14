import { CouponListItem } from "../../../types/interface";
import ResponseDto from "../Response.dto";

export default interface GetCouponListResponseDto extends ResponseDto{
    couponList: CouponListItem[];
}