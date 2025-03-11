import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import styles from './Navbar.module.css';

const Navbar = () => {

  const [errorMessage, setErrorMessage] = useState(' ');  // 에러 메시지를 저장할 상태 변수

  const handleClick = async () => {
    const r1 = { register: "R1" };

    // 백엔드로 데이터 전송
    try {
      const response = await fetch('https://localhost:443/trainee/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(r1) // JSON 형식으로 데이터 전송
      });

      const data = await response.json();     // 응답 데이터를 JSON 형식으로 파싱

      if (response.ok) {
        // 로그인 성공 시 처리
        console.log("유후~정보교환 성공(trainee/list)");
        setErrorMessage('');                    // 성공 시 에러 메시지 초기화
      } else {
        // 로그인 실패 시 처리
        console.log("로그인 실패");
        setErrorMessage(data);                  // 실패 메시지 상태에 저장
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setErrorMessage("서버와 연결할 수 없습니다."); // 네트워크 오류 시 에러 메시지 표시
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <ul>과정 관리</ul>
        <li>진행 예정</li>
        <li>진행중</li>
        <li>종료</li>
        <br />
        <ul>회원 관리</ul>
        <li><Link to="/member_list" className={styles.trainee} onClick={handleClick}>훈련생</Link></li>
        <li>강사</li>
        <li>관리자</li>
      </div>
    </div>
  )
}

export default Navbar;