import React, { useState, useEffect } from 'react';
import styles from './Instructor_registration.module.css';

const Instructor_registration = ({ onClose }) => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    tel: "",
    courseId: "",
    file: null,
  });

  const [selectedCourse, setSelectCourse] = useState();

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  // 파일 업로드시 선택된 파일을 상태값에 저장한다.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterForm((prev) => ({
      ...prev,
      file
    }));
  };

  // active 과정리스트 DB 요청코드
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://localhost:443/selectCourseIns', {
  //         method: 'GET',
  //       });

  //       if (response.ok) {
  //         const data = await response.json();

  //         setSelectCourse(data);
  //         console.log(data);
  //       } else {
  //         console.error('Failed to fetch data:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleSubmit = async (event) => {
    console.log(registerForm);
    event.preventDefault()

    try {
      const formData = new FormData();
      formData.append("name", registerForm.name);
      formData.append("tel", registerForm.tel);
      formData.append("courseId", registerForm.courseId);
      if (registerForm.file) {
        formData.append("file", registerForm.file);
      }

      const response = await fetch('https://localhost:443/instructor',
        {
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
        console.log(formData);
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

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
              <input
                className={styles.registration_textbox}
                name="courseId"
                placeholder="담당과정"
                value={registerForm.courseId}
                onChange={handleChange}
              />

              {/* <select
              name='selectCourseListInstructor'
              className={styles.registration_textbox}
              value={}
              >
                <option>{  }</option>

              </select> */}

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