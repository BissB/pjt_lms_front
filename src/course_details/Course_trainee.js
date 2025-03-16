import React, { useState, useEffect } from 'react';
import styles from './Trainee_preview.module.css';
import img1 from '../img/profile.png';

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

  const status = {
    "1": "훈련중",
    "2": "중도탈락",
    "3": "중도포기",
    "4": "취업완료",
  };

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
    <div className={styles.tableBody}>
      {loading && <p>Loading...</p>}
      {!loading && members.length === 0 && <p>훈련생 데이터가 없습니다.</p>}
      <table>
        <thead>
          <tr>
            <th>사진</th>
            <th>고유번호</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>신청과정</th>
            <th>등록일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.traineeId}>
              <td style={{ borderLeft: `10px solid ${getCourseColor(member.course)}` }}>
                <img src={member.photo || img1} alt="profile" />
              </td>
              <td>{member.traineeId}</td>
              <td>{member.name}</td>
              <td>{member.tel}</td>
              <td>{member.course?.name || '정보 없음'}</td>
              <td>{member.crtDate}</td>
              <td>{status[member.status]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course_trainee;
