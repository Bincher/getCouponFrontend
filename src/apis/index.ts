import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./request/auth";
import axios from "axios";
import { IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from "./response/auth";
import ResponseDto from "./response/Response.dto";
import { GetSignInUserResponseDto } from "./response/user";
import { GetCouponListResponseDto, GetCouponResponseDto, PostCouponResponseDto, ReceiveCouponResponseDto } from "./response/coupon";
import { PostCouponRequestDto, ReceiveCouponRequestDto } from "./request/coupon";

const DOMAIN = 'http://localhost:4000';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const authorization =(accessToken: string)=>{
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

const SIGN_IN_URL =()=> `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL =()=> `${API_DOMAIN}/auth/sign-up`;
const ID_CHECK_URL =()=> `${API_DOMAIN}/auth/id-check`;

export const signInRequest = async (requestBody: SignInRequestDto)=>{
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response =>{
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto)=>{
    const result = await axios.post(SIGN_UP_URL(), requestBody)
        .then(response =>{
            const responseBody:SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error=>{
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const idCheckRequest = async (requestBody: IdCheckRequestDto)=>{
    const result = await axios.post(ID_CHECK_URL(), requestBody)
        .then(response =>{
            const responseBody:IdCheckResponseDto = response.data;
            return responseBody;
        })
        .catch(error=>{
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const GET_SIGN_IN_USER_URL =()=>`${API_DOMAIN}/user`;

export const GetSignInUserRequest = async (accessToken: string) =>{
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response =>{
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
} 

const GET_COUPON_LIST_URL =()=> `${API_DOMAIN}/coupon`;
const POST_COUPON_URL =()=> `${API_DOMAIN}/coupon/admin`;
const RECEIVE_COUPON_URL =()=> `${API_DOMAIN}/coupon/event`;
const GET_COUPON_URL =(couponId: string)=> `${API_DOMAIN}/coupon/${couponId}`;

export const GetCouponListRequest = async () =>{
    const result = await axios.get(GET_COUPON_LIST_URL())
        .then(response =>{
            const responseBody: GetCouponListResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
} 

export const PostCouponRequest = async (requestBody: PostCouponRequestDto, accessToken: string) =>{
    const result = await axios.post(POST_COUPON_URL(), requestBody ,authorization(accessToken))
        .then(response =>{
            const responseBody: PostCouponResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
} 

export const ReceiveCouponRequest = async (requestBody: ReceiveCouponRequestDto, accessToken: string) =>{
    const result = await axios.post(RECEIVE_COUPON_URL(), requestBody ,authorization(accessToken))
        .then(response =>{
            const responseBody: ReceiveCouponResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
} 

export const GetCouponRequest = async (couponId: string) =>{
    const result = await axios.get(GET_COUPON_URL(couponId))
        .then(response =>{
            const responseBody: GetCouponResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL =()=> `${FILE_DOMAIN}/upload`;

export const fileUploadRequest = async (data: FormData) => {
    try {
        const response = await axios.post(FILE_UPLOAD_URL(), data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};