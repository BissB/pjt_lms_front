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
  });

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
          });
        } else {
          console.error('강사 정보 불러오기 실패:', response.statusText);
        }
      } catch (error) {
        console.error('요청중 오류 발생:', error);
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
    console.log(registerForm);

    try {
      const formData = new FormData();
      formData.append('name', registerForm.name);
      formData.append('tel', registerForm.tel);
      formData.append('course', registerForm.course);
      formData.append('status', registerForm.status);
      formData.append('enabled', registerForm.enabled);

      const response = await fetch(`https://localhost:443/instructor/${instructorId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('강사 정보가 수정되었습니다.');
        navigate(-1);

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
    navigate(-1);
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
            <div className={styles.photo}>
              <input
                type="file"
                accept="image/*"
                name="upfiles"
                onChange={handleFileChange}
              />
            </div>
            <div className={styles.btns}>
              <button type="submit" className={styles.submit} onClick={handleCancelClick}>수정</button>
              <button type="button" className={styles.cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Instructor_modification;
