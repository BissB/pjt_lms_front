import React, { useState } from 'react';
import styles from './Trainee_registration.module.css';

const Trainee_registration = ({ onClose }) => {
  const [registerForm, setRegisterForm] = useState({
    memberType: '',
    memberId: '',
    memberPassword: '',
    memberName: '',
    memberPhone: '',
    memberCourse: '',
    memberFile: null,
  });

  // 입력값 변경 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // 역할 변경 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterForm((prevForm) => ({
      ...prevForm,
      memberFile: file,
    }));
  };

  // 파일 변경 핸들러
  const handleRoleChange = (event) => {
    setRegisterForm((prevForm) => ({
      ...prevForm,
      memberType: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registerForm);

    try {
      const formData = new FormData();
      formData.append('memberType', registerForm.memberType);
      formData.append('memberId', registerForm.memberId);
      formData.append('memberPassword', registerForm.memberPassword);
      formData.append('memberName', registerForm.memberName);
      formData.append('memberPhone', registerForm.memberPhone);
      formData.append('memberCourse', registerForm.memberCourse);
      formData.append('memberFile', registerForm.memberFile);

      const response = await fetch('/project/register', {
        method: 'POST',
        body: formData,
      });

      // const [phoneNumber, setPhoneNumber] = useState('');

      // const handlePhoneNumberChange = (event) => {
      //   const input = event.target.value;
      //   const cleanedNumber = input.replace(/\D+/g, '');
      //   const formattedPhoneNumber = formatPhoneNumber(cleanedNumber);
      //   setPhoneNumber(formattedPhoneNumber);
      // };

      // const formatPhoneNumber = (number) => {
      //   if (number.length <= 3) {
      //     return number;
      //   } else if (number.length <= 6) {
      //     return `${number.substring(0, 3)} - ${number.substring(3)}`;
      //   } else {
      //     return `${number.substring(0, 3)} - ${number.substring(3, 7)} - ${number.substring(7)}`;
      //   }
      // };

      if (response.ok) {
        const data = await response.json();
        console.log('등록 성공:', data);
        alert('회원 등록이 완료되었습니다.');
        onClose(); // 폼 닫기
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
      <div className={styles.background}>
        <div className={styles.container}>
          <h2>회원 등록</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.form}>
              <div className={styles.radio}>

                <div>
                  <input
                    type="radio"
                    id="admin"
                    name="type"
                    value="1"
                    checked={registerForm.memberType === '1'}
                    onChange={handleRoleChange}
                  />
                  <label for="admin">관리자</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="instructor"
                    name="type"
                    value="2"
                    checked={registerForm.memberType === '2'}
                    onChange={handleRoleChange}
                  />
                  <label for="instructor">강사</label>
                </div>


                <div>
                  <input
                    type="radio"
                    id="student"
                    name="type"
                    value="3"
                    checked={registerForm.memberType === '3'}
                    onChange={handleRoleChange}
                  />
                  <label for="student">훈련생</label>
                </div>

              </div>

              {/* 입력 필드 */}
              <input
                type="text"
                className={styles.textbox}
                placeholder="아이디"
                name="memberId"
                value={registerForm.memberId}
                onChange={handleInputChange}
              />
              <input
                type="password"
                className={styles.textbox}
                placeholder="비밀번호"
                name="memberPassword"
                value={registerForm.memberPassword}
                onChange={handleInputChange}
              />
              <input
                type="text"
                className={styles.textbox}
                placeholder="이름"
                name="memberName"
                value={registerForm.memberName}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                className={styles.textbox}
                placeholder="전화번호(-제외)"
                name="memberPhone"
                value={registerForm.memberPhone}
                onChange={handleInputChange}
                maxLength={11}
              // value={phoneNumber}
              // onChange={handlePhoneNumberChange}
              // maxLength={17}
              />
              <input
                type="text"
                className={styles.textbox}
                placeholder="신청과정"
                name="memberCourse"
                value={registerForm.memberCourse}
                onChange={handleInputChange}
              />
              {/* 파일업로드 */}
              <div className={styles.photo}>
                <input
                  type="file"
                  accept="image/*"
                  name="memberFile"
                  onAbort={handleFileChange}
                />
              </div>
              <div className={styles.btns}>
                <button type="submit" className={styles.submit} >등록</button>
                <button
                  type="button"
                  className={styles.cancel}
                  onClick={handleCancelClick} 
                  >취소</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Trainee_registration;
