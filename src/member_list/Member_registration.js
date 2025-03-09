import React, { useState } from 'react';
import styles from './Member_registration.module.css';

const Member_registration = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    const input = event.target.value;
    const cleanedNumber = input.replace(/\D+/g, '');
    const formattedPhoneNumber = formatPhoneNumber(cleanedNumber);
    setPhoneNumber(formattedPhoneNumber);
  };

  const formatPhoneNumber = (number) => {
    if (number.length <= 3) {
      return number;
    } else if (number.length <= 6) {
      return `${number.substring(0, 3)} - ${number.substring(3)}`;
    } else {
      return `${number.substring(0, 3)} - ${number.substring(3, 7)} - ${number.substring(7)}`;
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
          <div className={styles.form}>
            <div className={styles.type}>
              <div>
                <input type="radio" id="student" name="type" value="student" />
                <label for="student">훈련생</label>
              </div>

              <div>
                <input type="radio" id="instructor" name="type" value="instructor" />
                <label for="instructor">강사</label>
              </div>

              <div>
                <input type="radio" id="admin" name="type" value="admin" />
                <label for="admin">관리자</label>
              </div>
            </div>

            <input type="text" className={styles.textbox} placeholder="아이디" />
            <input type="password" className={styles.textbox} placeholder="비밀번호" />
            <input type="text" className={styles.textbox} placeholder="이름" />
            <input
              type="tel"
              className={styles.textbox}
              placeholder="전화번호"
              maxLength={10}
            // value={phoneNumber}
            // onChange={handlePhoneNumberChange}
            // maxLength={17}
            />
            <input type="text" className={styles.textbox} placeholder="신청과정" />
            <div className={styles.photo}>
              <input type="file" accept="image/*" />
            </div>
            <div className={styles.btns}>
              <button type="submit" className={styles.submit}>등록</button>
              <button type="button" className={styles.cancel} onClick={handleCancelClick} >취소</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member_registration;
