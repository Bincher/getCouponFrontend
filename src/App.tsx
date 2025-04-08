import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from './constant';
import Main from './views/Main';
import Container from './layouts/Container';
import Auth from './views/Auth';
import { CookiesProvider, useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useLoginUserStore } from './stores';


function App() {



  return (
    <CookiesProvider>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Auth />} />
        </Route>
        <Route path='*'  element={<h1>404 Not Found</h1>}/>
      </Routes>
    </CookiesProvider>
    
  );
}

export default App;