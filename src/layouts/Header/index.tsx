import React, { useEffect, useState } from 'react'
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from '../../constant';
import { useLoginUserStore } from '../../stores';
import { useCookies } from 'react-cookie';

export default function Header(){

    // state: 로그인 유저 상태 //
    const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();

    // state: cookie 상태 //
    const [cookies, setCookie] = useCookies();

    // state: 로그인 상태 //
    const [isLogin, setLogin] = useState<boolean>(false);

    // function: 네비게이트 함수 //
    const navigate = useNavigate();

    // event handler: 로고 클릭 이벤트 처리 함수 //
    const onLogoClickHandler =()=>{
        navigate(MAIN_PATH());
    }

    // component: 로그인 버튼 컴포넌트 + 이후 마이페이지 버튼과 합칠 것 //
    const LoginButton =()=>{

        // event handler: 로그인 버튼 클릭 이벤트 처리 함수 //
        const onSignInButtonClickHandler=()=>{
            navigate(AUTH_PATH());
        }

        // event handler: 로그아웃 버튼 클릭 이벤트 처리 함수 //
        const onSignOutButtonClickHandler =()=>{
            resetLoginUser();
            setCookie('accessToken','',{path: MAIN_PATH(),expires: new Date()});
            navigate(MAIN_PATH());
        }

        if(isLogin){
            return(
                <div className='black-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
            )
        }
        return(
            
            <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
        )
    }

    // effect: login user가 변경될 때 마다 실행될 함수 //
    useEffect(() => {
        setLogin(loginUser !== null);
    }, [loginUser])

    return (
        <div id='header'>
            <div className='header-container'>
                <div className='header-left-box' onClick={onLogoClickHandler}>
                    <div className='icon-box'>
                        <div className='icon coupon-icon'></div>
                    </div>
                    <div className='header-logo'>{'선착순 쿠폰 제공 사이트'}</div>
                </div>
                <div className='header-right-box'>
                    <LoginButton/>
                </div>
            </div>
        </div>
    )

}