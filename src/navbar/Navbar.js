import { Link } from 'react-router-dom';
import React from 'react'
import styles from './Navbar.module.css';

const Navbar = () => {

  const handleLogout = () => {
    fetch('http://localhost:443/logout', {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('로그아웃 실패');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === '로그아웃 성공') {
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('로그아웃 중 에러 발생:', error);
      });
  }

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <ul>과정 관리</ul>
        <li><Link to="/course_overview?status=2" className={styles.trainee} >진행예정</Link></li>
        <li><Link to="/course_overview?status=1" className={styles.trainee} >진행중</Link></li>
        <li><Link to="/course_overview?status=0" className={styles.trainee} >진행종료</Link></li>
        <br />
        <ul>회원 관리</ul>
        <li><Link to="/member_list" className={styles.trainee} >훈련생</Link></li>
        <li>강사</li>
        <li>관리자</li>
      </div>

      <button className={styles.logout} onClick={handleLogout}>로그아웃</button>

    </div>
  )
}

export default Navbar;