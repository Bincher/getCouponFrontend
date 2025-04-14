import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./request/auth";
import axios from "axios";
import { IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from "./response/auth";
import ResponseDto from "./response/Response.dto";
import { GetSignInUserResponseDto } from "./response/user";
import { GetCouponListResponseDto } from "./response/coupon";

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