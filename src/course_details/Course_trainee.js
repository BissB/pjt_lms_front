import React, { useState, useEffect } from 'react';
import img1 from './img/profile.png';
import styles from './Course_trainee.module.css';

const Course_trainee = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 전화번호 포맷팅 함수
  function formatPhoneNumber(tel) {
    const telStr = tel.toString();
    return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
  }

  // 훈련생 데이터 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:443/trainee', { method: 'POST' });
        if (response.ok) {
          const data = await response.json();
          const formattedTrainees = data.content.map((member) => ({
            ...member,
            tel: formatPhoneNumber(member.tel),
          }));
          setMembers(formattedTrainees);
        } else {
          console.error('데이터 로드 실패:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getCourseColor = (course) => {
    switch (course) {
      case "백엔드":
        return "#FFEB9B";
      case "프론트":
        return "#72F2F6";
      case "풀스택":
        return "#96FF88";
      default:
        return "#ddd";
    }
  };

  return (
    <>
      <div className={styles.tableHeader}>
        <div>사진</div>
        <div>고유번호</div>
        <div>이름</div>
        <div>전화번호</div>
        <div>신청과정</div>
        <div>등록일</div>
      </div>
      <table className={styles.tableBody}>
        <tbody>
          {members.map((member) => (
            <tr key={member.traineeId} className={styles.tr}>
              <td className={styles.photo}>
                <img src={member.photo ? member.photo : img1} alt='' />
              </td>
              <td>{member.traineeId}</td>
              <td>{member.name}</td>
              <td>{member.tel}</td>
              <td>{member.course?.name || '정보 없음'}</td>
              <td>{member.crtDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default Course_trainee;
