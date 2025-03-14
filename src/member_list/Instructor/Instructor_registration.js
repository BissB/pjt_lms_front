import React, { useState, useEffect } from 'react';
import styles from './Instructor_registration.module.css';

const Instructor_registration = ({ onClose }) => {
  const [courses, setCourses] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    tel: "",
    courseId: "",
  });

  const [registerFile, setRegisterFile] = useState({
    file: null,
  });

  // 이름 및 전화번호 입력 핸들러
  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // 파일 업로드 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterFile((prev) => ({
      ...prev,
      file,
    }));
  };

  // 과정 선택 핸들러
  const handleCourseChange = (event) => {
    const selectedValue = event.target.value;
    console.log('선택된 과정 id:', selectedValue);

    // courseId를 바로 registerForm에 반영
    setRegisterForm((prev) => ({
      ...prev,
      courseId: selectedValue,
    }));
  };

  // 과정 리스트 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://localhost:443/course/selectCourseIns', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log(data);
        } else {
          console.error('Failed to fetch data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCourses();
  }, []);

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!registerForm.courseId) {
      alert('과정을 선택하세요.');
      return;
    }

    console.log('registerForm:', registerForm);
    console.log('registerFile:', registerFile);

    try {
      const formData = new FormData();
      formData.append("dto", new Blob([JSON.stringify(registerForm)], { type: "application/json" }));
      formData.append("upfiles", registerFile.file);

      const response = await fetch('https://localhost:443/instructor', {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('등록 성공:', data);
        alert('회원 등록이 완료되었습니다.');
        onClose();
      } else {
        console.error('등록 실패:', response.statusText);
        alert('회원 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 취소 버튼 핸들러
  const handleCancelClick = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.registration_background}>
        <div className={styles.registration_container}>
          <h2>강사 등록</h2>
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
                <option value="" disabled>과정을 선택하세요</option>
                {courses.map((course) => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.name}
                  </option>
                ))}
              </select>

              <div className={styles.registration_photo}>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={handleFileChange}
                />
              </div>
              <div className={styles.registration_btns}>
                <button type="submit" className={styles.registration_submit}>등록</button>
                <button type="button" className={styles.registration_cancel} onClick={handleCancelClick}>취소</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Instructor_registration;
