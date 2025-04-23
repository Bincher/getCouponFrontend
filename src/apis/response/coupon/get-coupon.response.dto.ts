import { Coupon } from "../../../types/interface";
import ResponseDto from "../Response.dto";

export default interface GetCouponResponseDto extends ResponseDto, Coupon{
    
}