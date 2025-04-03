import React from 'react'
import './style.css';

export default function Footer(){

    // event handler: 깃허브브 아이콘 버튼 클릭 이벤트 처리 //
    const onGithubIconButtonClickHandler = () =>{
        window.open('https://github.com/Bincher');
    }

    // event handler: Velog 아이콘 버튼 클릭 이벤트 처리 //
    const onVelogIconButtonClickHandler = () =>{
        window.open('https://velog.io/@bincher/posts');
    }

    // render: 푸터 레이아웃 렌더링 //
    return (
        <div id="footer">
            <div className="footer-container">
                <div className='footer-top'>
                    <div className='footer-logo-box'>
                        <div className='icon-box'>
                            <div className='icon coupon-icon'></div>
                        </div>
                        <div className='footer-logo-text'>{'선착순 쿠폰 지급 사이트'}</div>
                    </div>
                    <div className='footer-link-box'>
                        <div className='footer-email-link'>{'kimsb000616@gmail.com'}</div>
                        <div className='icon-button'>
                            <div className='icon github-icon' onClick={onGithubIconButtonClickHandler}></div>
                        </div>
                        <div className='icon-button'>
                            <div className='icon velog-icon' onClick={onVelogIconButtonClickHandler}></div>
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-copyright'>{'Copyright : 1234'}</div>
                </div>
            </div>
        </div>
    )
}