import { useNavigate } from 'react-router-dom';
import './style.css';
import { useEffect, useState } from 'react';
import { Coupon, CouponListItem } from '../../types/interface';
import { GetCouponListResponseDto, PostCouponResponseDto } from '../../apis/response/coupon';
import ResponseDto from '../../apis/response/Response.dto';
import { GetCouponListRequest, PostCouponRequest } from '../../apis';
import CouponItem from '../../components/CouponItem';
import { usePagination } from '../../hooks';
import Pagination from '../../components/Pagination';
import { useLoginUserStore } from '../../stores';
import { useCookies } from 'react-cookie';
import CouponModal from '../../components/CouponModal';

export default function Main() {

    // state: 로그인 유저 전역 상태 //
    const {loginUser} = useLoginUserStore();

    // state: 쿠키 상태 //
    const [cookies, setCookies] = useCookies();

    // state: 로그인 상태 //
    const [isLogin, setLogin] = useState<boolean>(false);

    // state: 모달 오픈 상태 //
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // function: post coupon response 처리 함수 //
    const postCouponResponse = (responseBody: PostCouponResponseDto | ResponseDto | null)=>{

        if(!responseBody){
            alert('네트워크 이상입니다.');
            return;
        }
        const{code} = responseBody;
        if(code === 'DBE')alert('데이터베이스 오류입니다.');
        if(code === 'SF' || code === 'VF') alert('입력 값 오류입니다.');
        if(code !== 'SU') return;

        alert('쿠폰이 성공적으로 등록되었습니다.');
        
        const refreshEvent = new CustomEvent('refreshCouponList');
        window.dispatchEvent(refreshEvent);
        
        closeModal();
    }

    // event handler: 쿠폰 추가 버튼 클릭 핸들러 //
    const CouponAddClickHandler = async (couponData: Coupon) => {

        const accessToken = cookies.accessToken;
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            return;
        }
        await PostCouponRequest(couponData, accessToken).then(postCouponResponse);
    };

    // event handler: 모달 열기 핸들러 //
    const openModal = () => {
        setIsModalOpen(true);
    };

    // event handler: 모달 닫기 핸들러 //
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // effect: login user가 변경될 때 마다 실행될 함수 //
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser])

    // component : 쿠폰 추가 버튼 컴포넌트 //
    function FloatingAddButton({ onClick }: { onClick: () => void }) {
        return (
            <button className="floating-add-btn" onClick={onClick}>
                +
            </button>
        );
    }

    // component: 메인 화면 상단 컴포넌트 //
    const MainTop =()=>{

        // state: 쿠폰 리스트 상태 //
        const [couponList, setCouponList] = useState<CouponListItem[]>([]); 

        // state: 페이지네이션 관련 상태 //
        const{
            currentPage,
            setCurrentPage,
            currentSection,
            setCurrentSection,
            viewList,
            viewPageList,
            totalSection,
            setTotalList
        } = usePagination<CouponListItem>(3);

        // function: get coupon list response 처리 함수 //
        const getCouponListResponse =(responseBody: GetCouponListResponseDto | ResponseDto | null)=> {
            if(!responseBody) return;
            const {code} = responseBody;
            if(code === 'DBE') alert('데이터베이스 오류입니다.');
            if(code !== 'SU') return;
    
            const {couponList} = responseBody as GetCouponListResponseDto;
            setCouponList(couponList);
            setTotalList(couponList);
        }

        // function: 쿠폰 목록 새로고침 함수
        const refreshCouponList = () => {
            GetCouponListRequest().then(getCouponListResponse);
        };
        
        // effect: 쿠폰 목록 새로고침 이벤트 리스너 추가
        useEffect(() => {

            window.addEventListener('refreshCouponList', refreshCouponList);
            return () => {
                window.removeEventListener('refreshCouponList', refreshCouponList);
            };
        }, []);
    
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
                            {viewList.map(couponListItem => <CouponItem couponListItem={couponListItem} />)}
                        </div>
                    </div>
                    
                        <div className='main-bottom-pagination-box'>
                            <Pagination 
                            currentPage={currentPage}
                            currentSection={currentSection}
                            setCurrentPage={setCurrentPage}
                            setCurrentSection={setCurrentSection}
                            viewPageList={viewPageList}
                            totalSection={totalSection}
                            />
                        </div>
                    </div>
                </div>
        )
    }

    return (
        <div className='main-wrapper'>
            <MainTop />
            {isLogin && loginUser?.role === 'ROLE_ADMIN' && (
                <FloatingAddButton onClick={openModal} />
            )}
            <CouponModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSubmit={CouponAddClickHandler} 
            />
        </div>
    );
}