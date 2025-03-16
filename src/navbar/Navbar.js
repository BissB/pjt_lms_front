import { Link } from 'react-router-dom';
import React from 'react'
import styles from './Navbar.module.css';

const Navbar = () => {

  const handleLogout = () => {
    fetch('https://localhost:443/security/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('로그아웃 실패');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === '로그아웃 성공') {
          alert("로그아웃 되었습니다.")
          window.location.href = '/';
        } else {
          console.error('응답 메시지:', data.message);
        }
      })
      .catch((error) => {
        console.error('로그아웃 중 에러 발생:', error);
      });
  };

  return (
    <div className={styles.nav}>

      <div className={styles.container}>
        <div className={styles.title}>과정 관리</div>
        <div className={styles.content}><Link to="/course_overview/1" >진행예정</Link></div>
        <div className={styles.content}><Link to="/course_overview/2" >진행중</Link></div>
        <div className={styles.content}><Link to="/course_overview/4" >진행종료</Link></div>

        <br />

        <div className={styles.title}>회원 관리</div>
        <div className={styles.content}><Link to="/trainee_list"  >훈련생</Link></div>
        <div className={styles.content}><Link to="/instructor_list" >강사</Link></div>

        <button className={styles.logout} onClick={handleLogout} >Logout</button>
      </div>

    </div>
  )
}

export default Navbar;