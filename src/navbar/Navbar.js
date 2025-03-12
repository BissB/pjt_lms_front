import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css';

const Navbar = () => {

  const [errorMessage, setErrorMessage] = useState(' ');  // 에러 메시지를 저장할 상태 변수

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <ul>과정 관리</ul>
        <li>진행 예정</li>
        <li><Link to="/course_overview" className={styles.trainee} >진행중</Link></li>
        <li>종료</li>
        <br />
        <ul>회원 관리</ul>
        <li><Link to="/member_list" className={styles.trainee} >훈련생</Link></li>
        <li>강사</li>
        <li>관리자</li>
      </div>
    </div>
  )
}

export default Navbar;