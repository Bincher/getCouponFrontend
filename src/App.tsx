import './App.css';
import { Route, Routes } from 'react-router-dom';
import { MAIN_PATH } from './constant';
import Main from './views/Main';
import Container from './layouts/Container';


function App() {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH()} element={<Main />} />
      </Route>
      <Route path='*'  element={<h1>404 Not Found</h1>}/>
    </Routes>
  );
}

export default App;