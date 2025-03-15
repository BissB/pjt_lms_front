import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Instructor_preview.module.css';
import { Instructor_Registration } from '..';
import img1 from '../img/profile.png';
// import img2 from '../img/2.png';
// import img3 from '../img/3.png';
// import img4 from '../img/4.png';
// import img5 from '../img/5.png';
// import img6 from '../img/6.png';
// import img7 from '../img/7.png';


const Instructor_list = () => {
  // 멤버 정보 (백엔드에서 어떻게 받아와야하나? 어떻게 적용해야하나?)
  const [members, setMembers] = useState([]);
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    isLastPage: false,
    isFirstPage: true,
  });  // 검색 결과
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const requestData = {
    page: page,
    pageSize: pageSize,
    condition: "name", // 검색 항목
    q: "Lorem2" // 항목 내용
  };

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  useEffect(() => {   //*** db에서 데이터 받아오기 ***
    const fetchData = async () => {

      try {
        const response = await fetch('https://localhost:443/instructor', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();

          const formattedInstructor = data.content.map((member) => ({
            ...member,
            tel: formatPhoneNumber(member.tel),
          }));

          setMembers(formattedInstructor);

          setPaging({
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number,
            isLastPage: data.last,
            isFirstPage: data.first,
          });

          console.log(data);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]); // [page]

  // 검색 상태 관리
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [searchOption, setSearchOption] = useState(''); // 검색 옵션
  // const [selectedStatus, setSelectedStatus] = useState([]); // 선택된 상태
  const [showRegistration, setShowRegistration] = useState(false);
  const [showModification, setShowModification] = useState(false);

  // 무한스크롤에 사용하기위한 변수들
  // const [visibleMembers, setVisibleMembers] = useState(members.slice(0, 3)); // 처음에 보여줄 멤버 수
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

  // const loadMoreMembers = async () => {
  //   setLoading(true);
  //   setPage(page + 1);

  //   try {
  //     const response = await fetch('https://localhost:443/instructor', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         page: page + 1,
  //         pageSize,
  //         condition: "name",
  //         q: "Lorem2",
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();

  //       if (Array.isArray(data)) {
  //         setMembers((prevMembers) => [...prevMembers, ...data]);
  //         setFilteredMembers((prevMembers) => [...prevMembers, ...data]);
  //       } else{
  //         console.log(data);
  //       }

  //       setLoading(false);

  //       if (data.length < pageSize) {
  //         setHasMore(false);
  //       }
  //     } else {
  //       console.error('등록 실패:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('요청 중 오류 발생:', error);
  //   }
  // };

  // 무한스크롤을 위한 설정
  // useEffect(() => {
  //   if (loading || !hasMore) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMoreMembers();
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );

  //   if (observerRef.current) observer.observe(observerRef.current);

  //   return () => observer.disconnect();
  // }, [loading, hasMore]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
  //       setShowEditMenu(null); // 팝업이 열려 있을 때, 다른 곳을 클릭하면 닫기
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [showEditMenu]);

  // 검색 버튼 클릭 이벤트 핸들러
  // const handleSearch = () => {
  //   if (searchOption === 'name') {
  //     const searchedMembers = members.filter((member) => member.name.includes(searchTerm));
  //     setFilteredMembers(searchedMembers);
  //     // setVisibleMembers(searchedMembers);
  //     setHasMore(true);
  //   } else if (searchOption === 'username') {
  //     const searchedMembers = members.filter((member) => member.username.includes(searchTerm));
  //     setFilteredMembers(searchedMembers);
  //     // setVisibleMembers(searchedMembers);
  //     setHasMore(true);
  //   } else if (searchOption === 'phone') {
  //     const searchedMembers = members.filter((member) => member.phone.includes(searchTerm));
  //     setFilteredMembers(searchedMembers);
  //     // setVisibleMembers(searchedMembers);
  //     setHasMore(true);
  //   } else {
  //     const searchedMembers = members.filter((member) => (member.name.includes(searchTerm) || member.username.includes(searchTerm)));
  //     setFilteredMembers(searchedMembers);
  //     // setVisibleMembers(searchedMembers);
  //     setHasMore(true);
  //   }
  // };

  const status = {
    "1": "등록",
    "2": "강의중",
    "3": "퇴사",
  };

  // 과정 종류에 따른 색상 변경
  const getCourseColor = (course) => {
    switch (course) { // 케이스 추가할것 (***)
      case "백엔드":
        return "#FFEB9B";
      case "프론트":
        return "#72F2F6";
      case "풀스택":
        return "#96FF88";
      default:
        return "#ddd"; // 기본 색상
    }
  };

  // 전화번호 포맷팅
  function formatPhoneNumber(tel) {
    const telStr = tel.toString();

    return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
  }

  // 엔터키 입력 시 검색 기능 작동
  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  return (
    <div className={styles.main}>
      <div className={styles.title}>강사 리스트</div>

      <div className={styles.btns}>
        <button className={styles.registerBtn} onClick={handleRegistrationClick}>강사 등록</button> {/* 회원 등록 버튼 */}
        {showRegistration && (
          <Instructor_Registration onClose={handleCloseRegistration} />
        )}

        {/* 검색항목 */}
        <div className={styles.searchContainer}>

          <select
            name='status'
            className={styles.dropdown}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">강사 상태</option>
            <option value="1">등록됨</option>
            <option value="2">강의중</option>
            <option value="3">퇴사</option>
          </select>

          <select
            name='searchWord'
            className={styles.dropdown}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">검색 항목</option>
            <option value="name">이름</option>
            <option value="phone">전화번호</option>
          </select>
          <input
            type="searchText"
            placeholder="검색어를 입력해주세요"
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          // onKeyUp={handleKeyPress}
          />
          <button className={styles.icon} /* onClick={handleSearch} */>
            <i className='fas fa-magnifying-glass' />
          </button>
        </div>
      </div>


      {/* 테이블 헤더 */}
      <div className={styles.tableHeader}>
        <div>사진</div>
        <div>고유번호</div>
        <div>이름</div>
        <div>전화번호</div>
        <div>담당과정</div>
        <div>등록일</div>
        <div>상태</div>
        <div>수정 / 삭제</div>
      </div>

      {/* 테이블 본문 */}
      <table className={styles.tableBody}>
        <tbody>
          {members.map((member) => (
            <tr key={member.instructorId} className={styles.tr}>
              <td className={styles.photo} style={{ borderLeft: `10px solid ${getCourseColor(member.course)}`, overflow: `hidden` }}>
                <img src={member.photo ? member.photo : img1} alt='' />
              </td>
              <td>{member.instructorId}</td>
              <td>{member.name}</td>
              <td>{member.tel}</td>
              <td>푸울스태액{/* {member.course} */}</td>
              <td>{member.crtDate}</td>
              <td>{status[member.status]}</td>
              <td>
                <button onClick={() => handleEditButton(member.instructorId)} className={`${styles.edit}`}>···</button>
                {showEditMenu === member.instructorId && (
                  <div ref={editMenuRef} className={styles.editMenu}>
                    <Link to={`/instructor_modify/${member.instructorId}`} className={styles.modify}>수정</Link> {/* 회원 수정 버튼 */}
                    <Link to={`/instructor_delete/${member.instructorId}`} className={styles.delete}>삭제</Link>
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

export default Instructor_list;
