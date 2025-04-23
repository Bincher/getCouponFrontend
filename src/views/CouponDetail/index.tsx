import { useEffect, useState } from 'react';
import './style.css';
import { useLoginUserStore } from '../../stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH } from '../../constant';
import { GetCouponResponseDto, ReceiveCouponResponseDto } from '../../apis/response/coupon';
import ResponseDto from '../../apis/response/Response.dto';
import { GetCouponRequest, ReceiveCouponRequest } from '../../apis';
import { Coupon } from '../../types/interface';


export default function CouponDetail() {
    
    // state: 로딩 상태 //
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    // state: 로그인 유저 전역 상태 //
    const { loginUser } = useLoginUserStore();
    
    // state: 쿠키 상태 //
    const [cookies, setCookies] = useCookies();
    
    // state: 로그인 상태 //
    const [isLogin, setLogin] = useState<boolean>(false);

    // state: coupon 상태 //
    const [coupon, setCoupon] = useState<Coupon | null>(null);

    // state: 쿠폰 비활성화 상태 //
    const [isDisabled, setIsDiabled] = useState<boolean>(false);
    
    // function: 내비게이트 함수 //
    const navigate = useNavigate();
    
    // function: URL 파라미터 추출 //
    const { couponId } = useParams();
    
    // effect: 로그인 유저가 변경될 때마다 실행될 함수 //
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser]);
    
    // function: 날짜 포맷팅 함수 //
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // function: 쿠폰 상세 정보 response 처리 함수 //
    const getCouponResponse = (responseBody: GetCouponResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            setIsLoading(false);
            return;
        }
        const { code } = responseBody;
        if (code === 'DBE') {
            setIsLoading(false);
            return;
        }
        if (code === 'NC') {
            setIsLoading(false);
            return;
        }
        if (code !== 'SU') {
            setIsLoading(false);
            return;
        }
        
        const coupon: Coupon = {...responseBody as GetCouponResponseDto};
        setCoupon(coupon)
        setIsLoading(false);

        // 오늘 날짜(시간은 0시로 맞춤)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const couponEndDate = new Date(coupon.endDate);
        couponEndDate.setHours(0, 0, 0, 0);

        setIsDiabled(Number(coupon.amount) < 1 || couponEndDate < today);
    };

    // function: 쿠폰 받기 response 처리 함수 //
    const receiveCouponResponse = (responseBody: ReceiveCouponResponseDto | ResponseDto | null) => {
        
    };

    // event handler: 쿠폰 받기 버튼 클릭 이벤트 처리 //
    const onReceiveCouponButtonClickHandler = (couponId : string|undefined) => {
        alert("쿠폰 받기!");
    };

    // effect: 컴포넌트가 마운트 될 때 쿠폰 정보 불러오기 //
    useEffect(() => {
        if (!couponId) {
            setIsLoading(false);
            return;
        }
        
        GetCouponRequest(couponId).then(getCouponResponse);
    }, [couponId]);

    if (isLoading) {
        return (
            <div className="coupon-detail-wrapper">
                <div className="loading-spinner">로딩 중...</div>
            </div>
        );
    }

    if(!coupon) return <></>

    return(
        <div className="coupon-detail-wrapper">
            <div className="coupon-detail-card">
                <div className="coupon-detail-image-box">
                    {coupon.couponImage ? (
                        <div 
                            className="coupon-list-item-image"
                            style={{ backgroundImage: `url(${coupon.couponImage})` }}
                        ></div>
                    ) : (
                        <div className="icon default-coupon-icon"></div>
                    )}
                </div>
                <div className="coupon-detail-info">
                    <div className="coupon-detail-name">{coupon.name}</div>
                    <div className="coupon-detail-amount">{coupon.amount} 개 남았습니다.</div>
                <div className="coupon-detail-date">
                    등록일: {formatDate(coupon.startDate)}<br/>
                    만료일: {formatDate(coupon.endDate)}
                </div>
                </div>
                <button
                    className="coupon-detail-receive-btn"
                    onClick={() => onReceiveCouponButtonClickHandler(couponId)}
                    disabled={isDisabled}
                >
                    쿠폰 받기
                </button>
                {isDisabled && (
                    <div className="coupon-detail-disabled-message">
                        {Number(coupon.amount) < 1
                        ? "쿠폰이 모두 소진되었습니다."
                        : "쿠폰 유효기간이 만료되었습니다."}
                    </div>
                )}
            </div>
        </div>
    )

}