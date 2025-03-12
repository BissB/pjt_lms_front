import React, { useState } from 'react';
import styles from './Trainee_registration.module.css';

const Trainee_registration = ({ onClose }) => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    tel: '',
    course: '',
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
      const jsonData = {
        name: registerForm.name,
        tel: registerForm.tel,
        course: registerForm.course,
      };

      const response = await fetch('https://localhost:443/trainee/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData),
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

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.registration_background}>
        <div className={styles.registration_container}>
          <h2>회원 등록</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.registration_form}>
              <input
                type="text"
                className={styles.registration_textbox}
                placeholder="이름"
                name="name"
                value={registerForm.name}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                className={styles.registration_textbox}
                placeholder="전화번호(-제외)"
                name="tel"
                value={registerForm.tel}
                onChange={handleInputChange}
                maxLength={10}
              />
              <input
                type="text"
                className={styles.registration_textbox}
                placeholder="신청과정"
                name="course"
                value={registerForm.course}
                onChange={handleInputChange}
              />
              <div className={styles.registration_photo}>
                <input
                  type="file"
                  accept="image/*"
                  name="upfiles"
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

export default Trainee_registration;