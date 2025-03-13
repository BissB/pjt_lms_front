import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Instructor_modification.module.css';

const Instructor_modification = () => {
  const cancel = useNavigate();

  const [registerForm, setRegisterForm] = useState({
      insId:'',
      name: '',
      tel: '',
      course: '',
      upfiles: '',
    });

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
      formData.append('upfiles', registerForm.upfiles);

      const response = await fetch(`/trainee/${registerForm.traineeId}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('수정 성공:', data);
        alert('강사 정보가 수정되었습니다.');

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
    cancel('/trainee_list');
  };

  return (
    <>
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
              />
              <input
                type="tel"
                className={styles.textbox}
                placeholder="전화번호(-제외)"
                name="tel"
                value={registerForm.tel}
                onChange={handleInputChange}
                maxLength={11}
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
                <button type="submit" className={styles.submit}>수정</button>
                <button type="button" className={styles.cancel} onClick={handleCancelClick}>취소</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Instructor_modification;
