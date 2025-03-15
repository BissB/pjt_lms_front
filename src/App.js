import './App.css';

import Login from './login/Login';
import Navbar from './navbar/Navbar';
import { Course_manage, Course_register }  from './course_overview';
import { Course_check, Course_modify } from './course_details';
import { Trainee, Trainee_Modification, Trainee_Deletion, Instructor, Instructor_Modification, Instructor_Deletion } from './member_list/';
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
          <Route path="/course_overview/:status" element={<Course_manage />} />
          <Route path="/course_detail/:courseId" element={<Course_check />} />
          <Route path="/course/update/:courseId" element={<Course_modify />} />
          <Route path="/trainee_list" element={<Trainee />} />
          <Route path="/trainee_modify" element={<Trainee_Modification />} />
          <Route path="/trainee_delete" element={<Trainee_Deletion />} />
          <Route path="/instructor_list" element={<Instructor />} />
          <Route path="/instructor_modify/:instructorId" element={<Instructor_Modification />} />
          <Route path="/instructor_delete/:instructorId" element={<Instructor_Deletion />} />
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



