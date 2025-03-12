import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Trainee_preview.module.css';
import { Trainee_Registration } from '.';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import img7 from './img/7.png';


const Trainee_list = () => {

  const criteriaDTO = {
    page: 0,
    pageSize: 10,
    condition: "name",
    q: "김태영"
  };
  const [members, setMembers] = useState([ // 멤버 정보 (백엔드에서 어떻게 받아와야하나? 어떻게 적용해야하나?)
    {
      id: 'A0123456',
      name: '신준철',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      status: '취업완료',
      photo: img1,
    },
    {
      id: 'A5431823',
      name: '윤성미',
      phone: '010-4167-5138',
      course: 'JAVA',
      date: '2025.02.23',
      status: '훈련중',
      photo: img2,
    },
    {
      id: 'A4315749',
      name: '홍성태',
      phone: '010-1234-5678',
      course: '백엔드',
      date: '2025.03.06',
      status: '취업완료',

      photo: img3,
    },
    {
      id: 'A85612654',
      name: '김태영',
      phone: '010-1234-5678',
      course: '풀스택',
      date: '2025.03.15',
      status: '취업완료',
      photo: img4,
    },
    {
      id: 'A984651',
      name: '최성락',
      phone: '010-1234-5678',
      course: 'eclipse',
      date: '2025.03.01',
      status: '훈련중',
      photo: img5,
    },
    {
      id: 'A534651',
      name: '오연주',
      phone: '010-1234-5678',
      course: '프론트엔드',
      date: '2025.01.18',
      status: '취업완료',
      photo: img6,
    },
    {
      id: 'A766213',
      name: '소용소',
      phone: '010-1234-5678',
      course: '미정',
      date: '2025.01.18',
      status: '훈련중',
      photo: img7,
    },
    {
      id: 'A6873513',
      name: '김헤헿1',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      status: '중도포기',
      photo: '',
    },
    {
      id: 'A572145',
      name: '김헤헿2',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      status: '중도포기',
      photo: '',
    },
    {
      id: 'A6721346',
      name: '김헤헿3',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      status: '중도탈락',
      photo: '',
    },
    {
      id: 'A11223344',
      name: '김헤헿4',
      phone: '010-1234-5678',
      course: '그래픽',
      date: '2025.03.06',
      status: '중도포기',
      photo: '',
    },
  ]);

  // // 상태 옵션 배열
  // const statusOptions = [
  //   { value: "1", label: "훈련중" },
  //   { value: "2", label: "중도탈락" },
  //   { value: "3", label: "중도포기" },
  //   { value: "4", label: "취업완료" },
  // ];

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  useEffect(() => {   //*** db에서 데이터 받아오기 ***
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:443/trainee/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const r1 = { register: "R1" };

  //     // 백엔드로 데이터 전송
  //     try {
  //       const response = await fetch('https://localhost:443/trainee/list', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(r1) // JSON 형식으로 데이터 전송
  //       });

  //       const data = await response.json();     // 응답 데이터를 JSON 형식으로 파싱

  //       if (response.ok) {
  //         // 로그인 성공 시 처리
  //         console.log("유후~정보교환 성공(trainee/list)");
  //         setErrorMessage('');                    // 성공 시 에러 메시지 초기화
  //       } else {
  //         // 로그인 실패 시 처리
  //         console.log("로그인 실패");
  //         setErrorMessage(data);                  // 실패 메시지 상태에 저장
  //       }
  //     } catch (error) {
  //       console.error("로그인 오류:", error);
  //       setErrorMessage("서버와 연결할 수 없습니다."); // 네트워크 오류 시 에러 메시지 표시
  //     }
  //   };
  // }, []);

  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [searchOption, setSearchOption] = useState(''); // 검색 옵션
  const [selectedStatus, setSelectedStatus] = useState([]); // 선택된 상태
  const [filteredMembers, setFilteredMembers] = useState(members);  // 검색 결과
  const [showRegistration, setShowRegistration] = useState(false);
  const [showModification, setShowModification] = useState(false);

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
      setShowModification(false); // 수정 팝업 초기화
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

  // 검색 버튼 클릭 이벤트 핸들러
  const handleSearch = () => {
    if (searchOption === 'name') {
      const searchedMembers = members.filter((member) => member.name.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    } else if (searchOption === 'username') {
      const searchedMembers = members.filter((member) => member.username.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    } else if (searchOption === 'phone') {
      const searchedMembers = members.filter((member) => member.phone.includes(searchTerm));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    } else {
      const searchedMembers = members.filter((member) => (member.name.includes(searchTerm) || member.username.includes(searchTerm)));
      setFilteredMembers(searchedMembers);
      setVisibleMembers(searchedMembers);
      setHasMore(true);
    }
  };

  // 상태 체크박스 변경 이벤트 핸들러
  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStatus((prev) => [...prev, value]);
      // setSelectedStatus(value);
    } else {
      setSelectedStatus((prev) => prev.filter((status) => status !== value));
    }
    filterByStatus();
  };

  // 상태에 따라 필터링
  const filterByStatus = () => {
    if (selectedStatus.length === 0) {
      setFilteredMembers(members);
    } else {
      const statusMap = {
        "1": "훈련중",
        "2": "중도탈락",
        "3": "중도포기",
        "4": "취업완료",
      };

      const filteredMembersByStatus = members.filter((member) => {
        return selectedStatus.some((status) => member.status === statusMap[status]);
      });

      setFilteredMembers(filteredMembersByStatus);
    }
    setVisibleMembers(filteredMembers); // 초기에 보여줄 멤버 수 설정
    // setHasMore(true); // 더 로드할 데이터가 있는지 여부 초기화
  };

  // 과정 종류에 따른 색상 변경
  const getCourseColor = (course) => {
    switch (course) { // 케이스 추가할것 (***)
      case "백엔드":
        return "#FFEB9B";
      case "프론트엔드":
        return "#72F2F6";
      case "풀스택":
        return "#96FF88";
      default:
        return null; // 기본 색상
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

  const [errorMessage, setErrorMessage] = useState(' ');  // 에러 메시지를 저장할 상태 변수

  return (
    <div className={styles.main}>
      <div className={styles.title}>훈련생 리스트</div>

      <div className={styles.btns}>
        <button className={styles.registerBtn} onClick={handleRegistrationClick}>회원 등록 버튼</button> {/* 회원 등록 버튼 */}
        {showRegistration && (
          <Trainee_Registration onClose={handleCloseRegistration} />
        )}

        {/* 검색항목 */}
        <div className={styles.searchContainer}>
          
          <select
            name='search'
            className={styles.dropdown}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">검색 항목</option>
            <option value="name">이름</option>
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
        <div>이름</div>
        <div>전화번호</div>
        <div>신청과정</div>
        <div>등록일</div>
        <div>상태</div>
        <div>수정 / 삭제</div>
      </div>

      {/* 테이블 본문 */}
      <table className={styles.tableBody}>
        <tbody>
          {visibleMembers.map((member, index) => (
            <tr key={index}>
              <td className={styles.photo} style={{ borderLeft: `10px solid ${getCourseColor(member.course)}` }}>
                <img src={member.photo} alt='member photo' />
              </td>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>{member.course}</td>
              <td>{member.date}</td>
              <td>{member.status}</td>
              <td>
                <button onClick={() => handleEditButton(index)} className={`${styles.edit}`}>···</button>
                {showEditMenu === index && (
                  <div ref={editMenuRef} className={styles.editMenu}>
                    <Link to={'/trainee_modify'} className={styles.modify}>수정</Link> {/* 회원 수정 버튼 */}
                    <Link to={'/trainee_delete'} className={styles.delete}>삭제</Link>
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

export default Trainee_list;
