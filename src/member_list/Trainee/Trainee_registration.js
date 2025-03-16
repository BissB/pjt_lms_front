import React, { useState, useEffect} from 'react';
import styles from './Trainee_registration.module.css';

const Trainee_registration = ({ onClose }) => {

  const reloadPage = () => {
    window.location.reload(); // 브라우저 전체 새로고침
  };

  const [courses, setCourses] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    tel: "",
    courseId: "",
  });

  const [registerFile, setRegisterFile] = useState(null);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterFile(file);
  };

  const handleCourseChange = (event) => {
    const selectedValue = event.target.value;
    setRegisterForm((prev) => ({
      ...prev,
      courseId: selectedValue,
    }));
  };

  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('https://localhost:443/course/selectCourseTrn', { method: 'GET' });
          if (response.ok) {
            const data = await response.json();
            console.log('courses: ', courses);
            setCourses(data);
          } else {
            console.log('과정 정보를 불러오는데 실패했습니다.');
          }
        } catch (error) {
        }
      };
      fetchCourses();
  }, []);

  // useEffect(() => {
  //     if (courses.length > 0 && !registerForm.courseId) {
  //       setRegisterForm((prevForm) => ({
  //         ...prevForm,
  //         courseId: courses[0].courseId,
  //       }));
  //     }
  // }, [courses]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registerForm.courseId || !registerForm.name || !registerForm.tel) {
      alert('이름, 전화번호, 신청과정을 입력하세요');
      return;
    }

    console.log('registerForm: ', registerForm);
    console.log('registerFile: ', registerFile);

    try {
      const formData = new FormData();
      formData.append("name", registerForm.name);
      formData.append("courseId", registerForm.courseId);
      formData.append("tel", registerForm.tel);
      if (registerFile) formData.append("upfiles", registerFile);

      const response = await fetch('https://localhost:443/trainee', { 
        method: "PUT", 
        body: formData,
      });

      if (response.ok) {
        alert('훈련생 등록이 완료되었습니다.');
        console.log(response);
        reloadPage();
        onClose();
      } else {
        alert('훈련생 등록에 실패했습니다.');
        console.log(response);
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelClick = () => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      setRegisterForm({ name: "", tel: "", courseId: "" });
      setRegisterFile(null);
      onClose();
    }
  };

  return (
    <div className={styles.registration_background}>
      <div className={styles.registration_container}>
        <h2>훈련생 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.registration_form}>
            <input
              className={styles.registration_textbox}
              name="name"
              placeholder="이름"
              value={registerForm.name}
              onChange={handleChange}
            />
            <input
              className={styles.registration_textbox}
              name="tel"
              placeholder="전화번호(-제외)"
              value={registerForm.tel}
              onChange={handleChange}
              maxLength={11}
            />
            <select
              name="courseId"
              className={styles.registration_textbox}
              value={registerForm.courseId}
              onChange={handleCourseChange}
            >
              <option value="">과정을 선택하세요</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.name}
                </option>
              ))}
            </select>
            <div className={styles.registration_photo}>
              <input type="file" name="file" onChange={handleFileChange} />
            </div>
            <div className={styles.registration_btns}>
              <button type="submit" className={styles.registration_submit}>등록</button>
              <button type="button" className={styles.registration_cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trainee_registration;