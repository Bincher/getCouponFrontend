import React, { useState,KeyboardEvent, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import InputBox from '../../components/InputBox';
import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from '../../apis/request/auth';
import { idCheckRequest, signInRequest, signUpRequest } from '../../apis';
import { IdCheckResponseDto, SignInResponseDto, SignUpResponseDto } from '../../apis/response/auth';
import ResponseDto from '../../apis/response/Response.dto';
import { MAIN_PATH } from '../../constant';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Auth() {

    // state: 화면 상태 //
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

    // state: 쿠키 상태 //
    const [cookies, setCookie] = useCookies();

    // function: 네비게이트 함수 //
    const navigate = useNavigate();
    
    const SignInCard =()=>{

        // state: 아이디 요소 참조 상태 //
        const idRef = useRef<HTMLInputElement | null>(null);

        // state: 패스워드 요소 참조 상태 //
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state: 아이디 상태 //
        const [id, setId] = useState<string>('');

        // state: 패스워드 상태 //
        const [password, setPassword] = useState<string>('');

        // state: 패스워드 타입 상태 //
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

        // state: 패스워드 버튼 아이콘 상태 //
        const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
        
        // state: 에러 상태 //
        const [error, setError] = useState<boolean>(false);

        // function: sign in response 처리 함수 //
        const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null)=>{
            if(!responseBody){
            alert('네트워크 이상입니다.');
            return;
            }
            const{code} = responseBody;
            if(code === 'DBE')alert('데이터베이스 오류입니다.');
            if(code === 'SF' || code === 'VF') setError(true);
            if(code !== 'SU') return;
    
            const {token, expirationTime} = responseBody as SignInResponseDto;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);
    
            setCookie('accessToken', token, {expires, path: MAIN_PATH()});
            navigate(MAIN_PATH());
    
        }

        // event handler: 아이디 변경 이벤트 처리 //
        const onIdChangeHandler =(event: ChangeEvent<HTMLInputElement>)=>{
            setError(false);
            const {value} = event.target;
            setId(value);
        }
    
        // event handler: 비밀번호 변경 이벤트 처리 //
        const onPasswordChangeHandler =(event: ChangeEvent<HTMLInputElement>)=>{
            setError(false);
            const {value} = event.target;
            setPassword(value);
        }

        // event handler: 로그인 버튼 클릭 이벤트 처리 //
        const onSignInButtonClickHandler =()=>{
            const requestBody: SignInRequestDto = {
                id, password
            }
            console.log(requestBody);
            signInRequest(requestBody).then(signInResponse);
        }
    
        // event handler: 회원가입 링크 클릭 이벤트 처리 //
        const onSignUpButtonClickHandler=()=>{
            setView('sign-up');
        }
    
        // event handler: 패스워드 버튼 클릭 이벤트 처리 //
        const onPasswordButtonClickHandler=()=>{
            if(passwordType === 'text'){
            setPasswordType('password');
            setPasswordButtonIcon('eye-light-off-icon');
            }else{
            setPasswordType('text');
            setPasswordButtonIcon('eye-light-on-icon');
            }
        }
    
        // event handler: 이메일 인풋 키 다운 이벤트 처리 //
        const onIdKeyDownHandler=(event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            if(!passwordRef.current) return;
            passwordRef.current.focus();
        }
    
        // event handler: 패스워드 인풋 키 다운 이벤트 처리 //
        const onPasswordKeyDownHandler=(event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            onSignInButtonClickHandler();
        }

        return(
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{'로그인'}</div>
                        </div>
                        <InputBox ref={idRef} label='아이디' type='text' placeholder='아이디를 입력해주세요' error={error} value={id} onChange={onIdChangeHandler} onKeyDown={onIdKeyDownHandler}/>
                        <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                    </div>
                    <div className='auth-card-bottom'>
                        {error &&
                        <div className='auth-sign-in-error-box'>
                            <div className='auth-sign-in-error-message'>
                            {'아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
                            </div>
                        </div>
                        }
                        <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                        <div className='auth-description-box'>{'신규 사용자이신가요?'}
                            <span className='auth-description-link' onClick={onSignUpButtonClickHandler}>{"회원가입"}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SignUpCard =()=>{

        // state: 아이디 요소 참조 상태 //
        const idRef = useRef<HTMLInputElement | null>(null);

        // state: 패스워드 요소 참조 상태 //
        const passwordRef = useRef<HTMLInputElement | null>(null);

        // state: 패스워드 확인 요소 참조 상태 //
        const passwordCheckRef = useRef<HTMLInputElement | null>(null);

        // state: 휴대 전화번호 요소 참조 상태 //
        const telNumberRef = useRef<HTMLInputElement | null>(null);

        // state: 아이디 상태 //
        const [id, setId] = useState<string>('');

        // state: 아이디 중복 체크 상태 //
        const [idCheck, setIdCheck] = useState<boolean>(false);

        // state: 패스워드 상태 //
        const [password, setPassword] = useState<string>('');

        // state: 패스워드 확인 상태 //
        const [passwordCheck, setPasswordCheck] = useState<string>('');

        // state: 핸드폰 번호 상태 //
        const [telNumber, setTelNumber] = useState<string>('');

        // state: 패스워드 타입 상태 //
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

        // state: 패스워드 체크 타입 상태 //
        const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

        // state: 아이디 에러 상태 //
        const [isIdError, setIdError] = useState<boolean>(false);

        // state: 패스워드 에러 상태 //
        const [isPasswordError, setPasswordError] = useState<boolean>(false);

        // state: 패스워드 확인 에러 상태 //
        const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

        // state: 휴대폰 번호 에러 상태 //
        const [isTelNumberError, setTelNumberError] = useState<boolean>(false);

        // state: 아이디 에러 메세지 상태 //
        const [idErrorMessage, setIdErrorMessage] = useState<string>('');

        // state: 패스워드 에러 메세지 상태 //
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

        // state: 패스워드 확인 에러 메세지 상태 //
        const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

        // state: 핸드폰 번호 에러 메세지 상태 //
        const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');

        // state: 아이디 버튼 아이콘 상태 //
        const [idButtonIcon, setIdButtonIcon] = useState<'check-ring-light-icon' | 'check-round-fill-icon'>('check-ring-light-icon');

        // state: 패스워드 버튼 아이콘 상태 //
        const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

        // state: 패스워드 확인 버튼 아이콘 상태 //
        const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
        
        // function: id check response 처리 함수 //
        const idCheckResponse = (responseBody: IdCheckResponseDto | ResponseDto | null) => {
            if(!responseBody){
                alert("네트워크 이상입니다.");
                return;
            } 
            const{code} = responseBody;
    
            if(code === "DI"){
                setIdError(true);
                setIdErrorMessage("중복되는 아이디입니다.");
                setIdCheck(false);
            }
            if(code === "VF"){
                alert("모든 값을 입력하세요.");
            }
            if(code === "DBE"){
                alert("데이터베이스 오류입니다.");
            }
    
            if(code !== "SU")return;
            
            setIdCheck(true);
            setIdButtonIcon('check-round-fill-icon');
        }

        // function: sign up response 처리 함수 //
        const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
            if(!responseBody){
                alert("네트워크 이상입니다.");
                return;
            } 
            const{code} = responseBody;
    
            if(code === "DI"){
                setIdError(true);
                setIdErrorMessage("중복되는 이메일 주소입니다.");
            }
            if(code === "VF"){
                alert("모든 값을 입력하세요.");
            }
            if(code === "DBE"){
                alert("데이터베이스 오류입니다.");
            }
    
            if(code !== "SU")return;
            
            setView('sign-in');
            alert("회원가입이 완료되었습니다.");
        }
        
        // event handler: 아이디 변경 이벤트 처리 //
        const onIdChangeHandler = (event:ChangeEvent<HTMLInputElement>) =>{
            const {value} = event.target;
            setId(value);
            setIdError(false);
            setIdErrorMessage('');
            setIdButtonIcon('check-ring-light-icon');
        }

        // event handler: 패스워드 변경 이벤트 처리 //
        const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
            const {value} = event.target;
            setPassword(value);
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
    
        // event handler: 패스워드 변경 체크 이벤트 처리 //
        const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
            const {value} = event.target;
            setPasswordCheck(value);
            setPasswordCheckError(false);
            setPasswordCheckErrorMessage('');
        }

        // event handler: 핸드폰 번호 변경 체크 이벤트 처리 //
        const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>)=>{
            const {value} = event.target;
            setTelNumber(value);
            setTelNumberError(false);
            setTelNumberErrorMessage('');
        }

        // event handler: 아이디 버튼 클릭 이벤트 처리 //
        const onIdButtonClickHandler =()=>{

            const hasId = id.trim().length !== 0;
            if(!hasId){
                setIdError(true);
                setIdErrorMessage('아이디를 입력해주세요');
            }

            const requestBody: IdCheckRequestDto = {
                id
            }
        
            idCheckRequest(requestBody).then(idCheckResponse);
        }

        // event handler: 패스워드 버튼 클릭 이벤트 처리 //
        const onPasswordButtonClickHandler =()=>{
            if(passwordButtonIcon === 'eye-light-off-icon'){
                setPasswordButtonIcon('eye-light-on-icon');
                setPasswordType('text');
            }else{
                setPasswordButtonIcon('eye-light-off-icon');
                setPasswordType('password');
            }
        }
    
        // event handler: 패스워드 확인 버튼 클릭 이벤트 처리 //
        const onPasswordCheckButtonClickHandler =()=>{
            if(passwordCheckButtonIcon === 'eye-light-off-icon'){
                setPasswordCheckButtonIcon('eye-light-on-icon');
                setPasswordCheckType('text');
            }else{
                setPasswordCheckButtonIcon('eye-light-off-icon');
                setPasswordCheckType('password');
            }
        }

        // event handler: 회원가입 버튼 클릭 이벤트 처리 //
        const onSignUpButtonClickHandler=()=>{

            const hasId = id.trim().length !== 0;
            if(!hasId){
                setIdError(true);
                setIdErrorMessage('아이디를 입력해주세요');
            }

            if(!idCheck){
                setIdError(true);
                setIdErrorMessage('아이디 중복 검사를 해주세요');
            }

            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
            const isPasswordRegex = passwordRegex.test(password)
            if(!isPasswordRegex){
                setPasswordError(true);
                setPasswordErrorMessage('8~13자의 영문자와 숫자를 최소 하나씩 포함해야 합니다.');
            }
    
            const isEqualPassword = password === passwordCheck;
            if(!isEqualPassword){
                setPasswordCheckError(true);
                setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다');
            }

            const hasTelNumber = telNumber.trim().length !== 0;
            const telNumberPattern = /^[0-9]{11,13}$/;
            const isTelNumberPattern = telNumberPattern.test(telNumber);
            if(hasTelNumber && !isTelNumberPattern){
                setTelNumberError(true);
                setTelNumberErrorMessage("숫자만 입력해주세요");
            }
    
            if(!hasId || !idCheck || !isPasswordRegex || !isEqualPassword || (hasTelNumber && !isTelNumberPattern)) return;
            
            const requestBody: SignUpRequestDto = {
                id, password, telNumber
            }
            console.log(requestBody);
            signUpRequest(requestBody).then(signUpResponse);
        }

        // event handler: 로그인 링크 클릭 이벤트 처리 //
        const onSignInLinkClickHandler =()=>{
            setView('sign-in');
        }  

        // event handler: 아이디 키 다운 이벤트 처리 //
        const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            if(!passwordRef.current) return;
            passwordRef.current.focus();
        }
    
        // event handler: 패스워드 키 다운 이벤트 처리 //
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            if(!passwordCheckRef.current) return;
            passwordCheckRef.current.focus();
        }
    
        // event handler: 패스워드 확인 키 다운 이벤트 처리 //
        const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            if(!telNumberRef.current) return;
            telNumberRef.current.focus();
        }
    
        // event handler: 핸드폰 번호 키 다운 이벤트 처리 //
        const ontelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
            if(event.key !== 'Enter') return;
            onSignUpButtonClickHandler();
        }

        return(
            <div className='auth-card'>
                <div className='auth-card-box'>
                    <div className='auth-card-top'>
                        <div className='auth-card-title-box'>
                            <div className='auth-card-title'>{'회원가입'}</div>
                        </div>
                        <InputBox ref={idRef} label='아이디*' type='text' placeholder='아이디를 입력해주세요.' value={id} onChange={onIdChangeHandler} error={isIdError} message={idErrorMessage} icon={idButtonIcon} onButtonClick={onIdButtonClickHandler} onKeyDown={onIdKeyDownHandler}/>
                        <InputBox ref={passwordRef} label='비밀번호*' type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
                        <InputBox ref={passwordCheckRef} label='비밀번호 확인*' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
                        <InputBox ref={telNumberRef} label='휴대폰 번호(선택)' type='text' placeholder='휴대폰 번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={ontelNumberKeyDownHandler}/>
                    </div>
                    <div className='auth-card-bottom'>
                        <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                        <div className='auth-description-box'>{'이미 계정이 있으신가요? '}
                            <span className='auth-description-link' onClick={onSignInLinkClickHandler}>{"로그인"}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='main-wrapper'>
            <div className='auth-container'>
                {view === 'sign-in' && <SignInCard />}
                {view === 'sign-up' && <SignUpCard />}
            </div>
        </div>
    );
}