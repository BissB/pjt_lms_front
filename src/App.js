import './App.css';

import Login from './login/Login';
import Navbar from './navbar/Navbar';
import { Course_manage } from './course_overview';
import { Course_check } from './course_details';
import { Member } from './member_list/';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation(); // 현재 경로를 가져옴
  const excludedRoutes = ['/']; // Navbar를 숨길 경로 목록

  return (
    <div className="App">
      <div className='main'>
        {!excludedRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/course_overview" element={<Course_manage />} />
          <Route path="/course_detail" element={<Course_check />} />
          <Route path="/member_list" element={<Member />} />
        </Routes>
      </div>
    </div>
  );
}

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;



