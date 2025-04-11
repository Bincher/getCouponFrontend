import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from './constant';
import Main from './views/Main';
import Container from './layouts/Container';
import Auth from './views/Auth';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useLoginUserStore } from './stores';
import ResponseDto from './apis/response/Response.dto';
import { User } from './types/interface';
import { GetSignInUserResponseDto } from './apis/response/user';
import { GetSignInUserRequest } from './apis';


function App() {

  // state: 로그인 유저 전역 상태 //
  const {setLoginUser, resetLoginUser} = useLoginUserStore();
  
  // state: cookie 상태 //
  const [cookies, setCookie] = useCookies();

  // function: get sign in user response 처리 함수 //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if(!responseBody) return;
    const {code} = responseBody;
    if(code === 'AF' || code === 'NU' || code === "DBE"){
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...(responseBody as GetSignInUserResponseDto)};
    setLoginUser(loginUser);
  }

  // effect: accessToken cookie 값이 변경될 때 마다 실행할 함수 //
  useEffect(()=>{
    if(!cookies.accessToken){
      resetLoginUser();
      return;
    }
    GetSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  },[cookies.accessToken])

  return (
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Auth />} />
        </Route>
        <Route path='*'  element={<h1>404 Not Found</h1>}/>
      </Routes>
    
  );
}

export default App;