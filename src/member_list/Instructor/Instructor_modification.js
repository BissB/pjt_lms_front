import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Instructor_modification.module.css';

const Instructor_modification = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    tel: '',
    course: '',
    status: '',
    enabled: '',
    upfiles: null,
  });

  // 기존 강사 정보 가져오기
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await fetch(`https://localhost:443/instructor/${instructorId}`);
        if (response.ok) {
          const data = await response.json();
          setRegisterForm({
            name: data.name,
            tel: data.tel,
            course: data.course,
            status: data.status,
            enabled: data.enabled,
            upfiles: null, // 파일은 기본적으로 null로 설정
          });
        } else {
          console.error('강사 정보 불러오기 실패:', response.statusText);
        }
      } catch (error) {
        console.error('요청 중 오류 발생:', error);
      }
    };

    fetchInstructorData();
  }, [instructorId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterForm((prevForm) => ({
      ...prevForm,
      upfiles: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', registerForm.name);
      formData.append('tel', registerForm.tel);
      formData.append('course', registerForm.course);
      formData.append('status', registerForm.status);
      formData.append('enabled', registerForm.enabled);

      if (registerForm.upfiles) {
        formData.append('upfiles', registerForm.upfiles); // 파일 추가
      }

      const response = await fetch(`https://localhost:443/instructor/${instructorId}`, {
        method: 'POST', // 수정 요청은 PUT 메서드 사용
        body: formData,
      });

      if (response.ok) {
        alert('강사 정보가 성공적으로 수정되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      } else {
        console.error('수정 실패:', response.statusText);
        alert('강사 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCancelClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>강사정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <input
              type="text"
              className={styles.textbox}
              placeholder="이름"
              name="name"
              value={registerForm.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              className={styles.textbox}
              placeholder="전화번호(-제외)"
              name="tel"
              value={registerForm.tel}
              onChange={handleInputChange}
              maxLength={11}
              required
            />
            <input
              type="text"
              className={styles.textbox}
              placeholder="담당과정"
              name="course"
              value={registerForm.course}
              onChange={handleInputChange}
            />
            
            <input
              type="text"
              className={styles.textbox}
              placeholder="상태(status)"
              name="status"
              value={registerForm.status}
              onChange={handleInputChange}
            />

            <input
              type="text"
              className={styles.textbox}
              placeholder="활성화 여부(enabled)"
              name="enabled"
              value={registerForm.enabled}
              onChange={handleInputChange}
            />

            <div className={styles.photo}>
              <input
                type="file"
                accept="image/*"
                name="upfiles"
                onChange={handleFileChange}
              />
            </div>

            <div className={styles.btns}>
              {/* 수정 버튼 */}
              <button type="submit" className={styles.submit}>수정</button>
              
              {/* 취소 버튼 */}
              <button type="button" className={styles.cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Instructor_modification;
