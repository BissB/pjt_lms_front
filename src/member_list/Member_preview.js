import React, { useState, useEffect } from 'react';
import styles from './Member_preview.module.css';
import { Registration } from './';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';


const Member_list = () => {

  const [members, setMembers] = useState([ // 멤버 정보 (백엔드에서 어떻게 받아와야하나? 어떻게 적용해야하나?)
    {
      id: 'A0123456',
      name: '신준철',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: img1,
    },
    {
      id: 'A5431823',
      name: '윤성미',
      username: 'hterhjdqp',
      phone: '010-4167-5138',
      course: 'JAVA',
      date: '2025.02.23',
      photo: img2,
    },
    {
      id: 'A4315749',
      name: '홍성태',
      username: 'krgwsfgxfx',
      phone: '010-1234-5678',
      course: '백엔드',
      date: '2025.03.06',
      photo: img3,
    },
    {
      id: 'A85612654',
      name: '김태영',
      username: 'mrwsgfvbdg',
      phone: '010-1234-5678',
      course: '풀스택',
      date: '2025.03.15',
      photo: img4,
    },
    {
      id: 'A984651',
      name: '최성락',
      username: 'yjtdryt',
      phone: '010-1234-5678',
      course: 'eclipse',
      date: '2025.03.01',
      photo: img5,
    },
    {
      id: 'A534651',
      name: '오연주',
      username: 'uktreedrv',
      phone: '010-1234-5678',
      course: '프론트엔드',
      date: '2025.01.18',
      photo: img6,
    },
  ]);

  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
      setShowRegistration(false);
  };

  // useEffect(() => {   *** db에서 데이터 받아오기 ***
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://your-backend-api.com/members');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setMembers(data);
  //       setFilteredMembers(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearch = () => {
    if (searchOption === 'name') {
      setFilteredMembers(members.filter((member) => member.name.includes(searchTerm)));
    } else if (searchOption === 'username') {
      setFilteredMembers(members.filter((member) => member.username.includes(searchTerm)));
    } else {
      setFilteredMembers(members.filter((member) => member.name.includes(searchTerm) || member.username.includes(searchTerm)));
    }
  };

  // 과정 종류에 따른 색상 변경
  const getCourseColor = (course) => {
    switch (course) { // 케이스 추가할것 (***)
      case "그래픽":
        return "#F67272";
      case "JAVA":
        return "#B0B2FF";
      case "백엔드":
        return "#FFEB9B";
      case "프론트엔드":
        return "#72F2F6";
      case "eclipse":
        return "#FF7BED";
      default:
        return "#96FF88"; // 기본 색상
    }
  };

  // 엔터키 입력 시 검색 기능 작동
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>훈련생 리스트</div>

      <div className={styles.btns}>
        <button className={styles.registerBtn} onClick={handleRegistrationClick}>회원 등록 버튼</button> {/* 회원 등록 버튼 */}
        {showRegistration && (
            <Registration onClose={handleCloseRegistration} />
        )}

        {/* 검색항목 */}
        <div className={styles.searchContainer}>
          <select
            className={styles.dropdown}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">검색 항목</option>
            <option value="name">이름</option>
            <option value="username">아이디</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button className={styles.icon} onClick={handleSearch}>
            <i className='fas fa-magnifying-glass' />
          </button>
        </div>
      </div>


      {/* 테이블 헤더 */}
      <div className={styles.tableHeader}>
        <div>사진</div>
        <div>회원번호</div>
        <div>이름 / 아이디</div>
        <div>전화번호</div>
        <div>신청과정</div>
        <div>등록일</div>
        <div>수정 / 삭제</div>
      </div>

      {/* 테이블 본문 */}
      <table className={styles.tableBody}>
        <tbody>
          {filteredMembers.map((member, index) => (
            // <tr key={index} style= {{ backgroundColor: getCourseColor(member.course) }} >
            <tr key={index}>
              <td className={styles.photo} style={{ borderLeft: `10px solid ${getCourseColor(member.course)}` }}>
                <img src={member.photo} alt='' />
              </td>
              <td>{member.id}</td>
              <td>{member.name} / {member.username}</td>
              <td>{member.phone}</td>
              <td>{member.course}</td>
              <td>{member.date}</td>
              <td className={styles.edit}><button>···</button></td> {/* 수정 / 삭제 버튼 */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member_list;
