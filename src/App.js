import './App.css';
import  Course_manage  from './course_component_2/Course_manage';
import { Member } from './member_component/index';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <div className='main'>
        {/* <Course_manage/> */}
        <Navbar />
        <Member />
      </div>
    </div>
  );
}

export default App;