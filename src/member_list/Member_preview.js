import React, { useState } from 'react';
import styles from './Member_preview.module.css';

const Member_list = () => {
  // 회원 정보 상태 관리
  const [members, setMembers] = useState([
    {
      id: 'A0123456',
      name: '신준철',
      username: 'wpgkf',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: 'https://via.placeholder.com/50', // 임시 사진 URL
    },
    {
      id: 'A0123456',
      name: '윤성미',
      username: 'widqp',
      phone: '010-1234-5678',
      course: 'JAVA',
      date: '2025.03.06',
      photo: 'https://via.placeholder.com/50',
    },
    // 추가 회원 데이터...
  ]);

  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 필터링 함수
  const filteredMembers = members.filter((member) =>
    member.name.includes(searchTerm) || member.username.includes(searchTerm)
  );

  return (
    <div className={styles.main}>
      <h1>훈련생 리스트</h1>

      <div className={styles.btns}>
        <button className={styles.registerButton}>회원 등록 버튼</button> {/* 회원 등록 버튼 */}

        {/* 검색 기능 */}
        <div className={styles.searchContainer}>
          <select className={styles.searchDropdown}>
            <option value="">검색 항목</option>
            <option value="name">이름</option>
            <option value="username">아이디</option>
            {/* 필요한 검색 항목 추가 */}
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>검색</button>
        </div>
      </div>

      {/* 테이블 */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>사진</th>
            <th>회원번호</th>
            <th>이름 / 아이디</th>
            <th>전화번호</th>
            <th>신청과정</th>
            <th>등록일</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={index}>
              <td>
                <img src={member.photo} alt={`${member.name} 사진`} />
              </td>
              <td>{member.id}</td>
              <td>{member.name} / {member.username}</td>
              <td>{member.phone}</td>
              <td>{member.course}</td>
              <td>{member.date}</td>
              <td>...</td> {/* 수정/삭제 버튼 자리 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member_list;