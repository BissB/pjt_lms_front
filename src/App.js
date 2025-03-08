import './App.css';

import Login from './login/Login';
import  Course_manage  from './course_component_2/Course_manage';
import {Course_check} from './course_details';
import { Member } from './member_list/';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <div className='main'>
        
        {/* <Course_manage/> */}
        <Navbar />
        <Login />
        {/* <Member /> */}
        {/* <Course_check/> */}
      </div>
    </div>
  );
}

export default App;