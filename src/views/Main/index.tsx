import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import { CouponListItem } from '../../types/interface';
import { GetCouponListResponseDto } from '../../apis/response/coupon';
import ResponseDto from '../../apis/response/Response.dto';
import { GetCouponListRequest } from '../../apis';
import CouponItem from '../../components/CouponItem';

export default function Main() {

    // function: 네이게이트 함수 //
    const navigate = useNavigate();

    // component: 메인 화면 상단 컴포넌트 //
    const MainTop =()=>{

        // state: 쿠폰 리스트 상태 //
        const [couponList, setCouponList] = useState<CouponListItem[]>([]); 

        // function: get coupon list response 처리 함수 //
        const getCouponListResponse =(responseBody: GetCouponListResponseDto | ResponseDto | null)=> {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;
    
            const {couponList} = responseBody as GetCouponListResponseDto;
            setCouponList(couponList);
        }
    
        // effect: 첫 마운트 시 실행될 함수 //
        useEffect(()=>{
            GetCouponListRequest().then(getCouponListResponse);
        },[])

        // render: 메인 화면 상단 컴포넌트 렌더링 //
        return(
            <div id='main-top-wrapper'>
                <div className='main-top-container'>
                    <div className='main-top-title'>{'지금 쿠폰들을\n다운로드 해보세요!'}</div>
                    <div className='main-top-contents-box'>
                        <div className='main-top-contents-title'>{'현재 쿠폰'}</div>
                        <div className='main-top-contents'>
                            {couponList.map(couponListItem => <CouponItem couponListItem={couponListItem}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='main-wrapper'>
            <MainTop />
        </div>
    );
}