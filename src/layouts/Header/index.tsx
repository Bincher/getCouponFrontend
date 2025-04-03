import React from 'react'
import './style.css';

export default function Header(){

    // event handler: 로고 클릭 이벤트 처리 함수 //
    const onLogoClickHandler =()=>{

    }

    // component: 로그인 버튼 컴포넌트 + 이후 마이페이지 버튼과 합칠 것 //
    const LoginButton =()=>{

        // event handler: 로그인 버튼 클릭 이벤트 처리 함수 //
        const onSignInButtonClickHandler=()=>{

        }

        return(
            <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
        )
    }


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