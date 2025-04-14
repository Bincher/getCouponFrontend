import "./style.css";
import { CouponListItem } from "../../types/interface";
import { useNavigate } from "react-router-dom";
import { COUPON_PATH, MAIN_PATH } from "../../constant";

interface Props{
    couponListItem: CouponListItem;
}

export default function CouponItem({couponListItem}: Props){
    // properties
    const { id, name, amount, startDate, endDate, couponImage} = couponListItem;

    // function : 네비게이트 함수
    const navigate = useNavigate();

    // event handler : 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        navigate(COUPON_PATH(id.toString()));
    };

    // function : 날짜 포맷팅 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return(
        <div className="coupon-list-item" onClick={onClickHandler}>
            <div className="coupon-list-item-main-box">
                <div className="coupon-list-item-top">
                    <div className="coupon-list-item-image-box">
                        {couponImage ? (
                                <div 
                                    className="coupon-list-item-image"
                                    style={{ backgroundImage: `url(${couponImage})` }}
                                ></div>
                            ) : (
                                <div className="icon default-coupon-icon"></div>
                            )}
                    </div>
                </div>
                <div className="coupon-list-item-middle">
                    <div className="coupon-list-item-name">{name}</div>
                    <div className="coupon-list-item-amount">{`${amount} 개 남았습니다.`}</div>
                </div>
                <div className="coupon-list-item-bottom">
                    <div className="coupon-list-item-dates">
                        {`${formatDate(startDate)} ~ ${formatDate(endDate)}`}
                    </div>
                </div>
            </div>
        </div>
    );
}