import React, { useState, useEffect, useRef } from 'react';
import styles from './Member_preview.module.css';
import { Registration } from './';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';


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
    {
      id: 'A766213',
      name: '소용소',
      username: 'htesgrrg',
      phone: '010-1234-5678',
      course: '미정',
      date: '2025.01.18',
      photo: img7,
    },
    {
      id: 'A6873513',
      name: '김헤헿1',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A572145',
      name: '김헤헿2',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A6721346',
      name: '김헤헿3',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A11223344',
      name: '김헤헿4',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A563244',
      name: '김헤헿5',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A832556',
      name: '김헤헿6',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A234456',
      name: '김헤헿7',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A7823456',
      name: '김헤헿8',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A723456',
      name: '김헤헿9',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A986556',
      name: '김헤헿10',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A08723123456',
      name: '김헤헿11',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
    {
      id: 'A063126',
      name: '김헤헿12',
      username: 'wpgkfhfef',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      photo: '',
    },
  ]);

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

  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [searchOption, setSearchOption] = useState(''); // 검색 옵션
  const [filteredMembers, setFilteredMembers] = useState(members);  // 검색 결과
  const [showRegistration, setShowRegistration] = useState(false);

  // 무한스크롤에 사용하기위한 변수들
  const [visibleMembers, setVisibleMembers] = useState(members.slice(0, 3)); // 처음에 보여줄 멤버 수
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지 여부
  const observerRef = useRef(null); // IntersectionObserver에 사용할 ref

  // 수정 / 삭제 메뉴 관리
  const [showEditMenu, setShowEditMenu] = useState(null);
  const editMenuRef = useRef(null);

  // 수정 / 삭제 팝업 여는 조건
  const handleEditButton = (index) => {
    if (showEditMenu === index) {
      setShowEditMenu(null); // 팝업이 이미 열려있으면 닫기
    } else {
      setShowEditMenu(index); // 팝업 열기
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setShowEditMenu(null); // 팝업이 열려 있을 때, 다른 곳을 클릭하면 닫기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEditMenu]);

  const handleEditMenuClose = () => {
    setShowEditMenu(null);
  };

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearch = () => {
    if (searchOption === 'name') {  // 이름 검색 추가
      const searchedMembers = members.filter((member) => member.name.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true); // 검색 후 다시 로딩 가능하도록 설정
    } else if (searchOption === 'username') { // 아이디 검색 추가
      const searchedMembers = members.filter((member) => member.username.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    } else if (searchOption === 'phone') {  // 전화번호 검색 추가
      const searchedMembers = members.filter((member) => member.phone.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    } else {
      const searchedMembers = members.filter((member) => member.name.includes(searchTerm) || member.username.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
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
      case "풀스택":
        return "#96FF88";
      default:
        return "#ddd"; // 기본 색상
    }
  };

  // 엔터키 입력 시 검색 기능 작동
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 무한 스크롤을 위한 데이터 로드 함수
  const loadMoreMembers = () => {
    setLoading(true);
    setTimeout(() => {
      const nextIndex = visibleMembers.length;
      const moreMembers = filteredMembers.slice(nextIndex, nextIndex + 5); // filteredMembers에서 다음 데이터를 가져옴

      if (moreMembers.length > 0) {
        setVisibleMembers((prev) => [...prev, ...moreMembers]);
      } else {
        setHasMore(false); // 더 로드할 데이터가 없으면 hasMore를 false로 설정
      }

      setLoading(false);
    }, 1000);
  };

  // 무한스크롤을 위한 설정
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreMembers();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore, filteredMembers]);


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
            <option value="phone">전화번호</option>
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
          {visibleMembers.map((member, index) => (
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
              <td>
                <button onClick={() => handleEditButton(index)} className={`${styles.edit}`}>···</button>
                {showEditMenu === index && (
                  <div ref={editMenuRef} className={styles.editMenu}>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                )}
              </td> {/* 수정 / 삭제 버튼 */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 스크롤 확인용 div */}
      <div ref={observerRef} style={{ height: "3px" }} />

      {/* 로딩상태 표시 */}
      {loading && <p style={{ textAlign: 'center', marginTop: '0' }}>Loading...</p>}
      {!hasMore && ''}
    </div>
  );
};

export default Member_list;
