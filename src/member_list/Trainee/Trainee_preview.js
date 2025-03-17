import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Trainee_preview.module.css';
import { Trainee_Registration } from '..';
import img1 from '../img/profile.png';

const Ttrainee_list = () => {
  // 멤버 정보 및 페이징
  const [members, setMembers] = useState([]);
  const [paging, setPaging] = useState({
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    isLastPage: false,
    isFirstPage: true,
  });
  const [currPage, setCurrPage] = useState(0);
  const [pageSize] = useState(10); // pageSize는 상수로 사용
  const navigate = useNavigate();

  // 무한스크롤 상태 및 ref (중복 선언 제거)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  // 검색 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');

  // 등록 및 수정 상태
  const [showRegistration, setShowRegistration] = useState(false);
  const [showModification, setShowModification] = useState(false);

  // 수정/삭제 메뉴 관리
  const [showEditMenu, setShowEditMenu] = useState(null);
  const editMenuRef = useRef(null);

  // 전화번호 포맷팅 함수
  function formatPhoneNumber(tel) {
    const telStr = tel.toString();
    return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
  }

  // 무한스크롤용 강사 데이터 불러오기 함수
  const fetchMembers = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const params = new URLSearchParams({
      currPage: currPage,
      pageSize: pageSize,
    });

    try {
      const response = await fetch(`https://localhost:443/trainee?${params.toString()}`, {
        method: 'POST',
        });

      if (response.ok) {
        const data = await response.json();
        const formattedTtrainee = data.content.map((member) => ({
          ...member,
          tel: formatPhoneNumber(member.tel),
          upfilePath: member.upfile[0]?.path || "",
          upfileName: member.upfile[0]?.original || "",
        }));
        setMembers(prev => currPage === 0 ? formattedTtrainee : [...prev, ...formattedTtrainee]);
        setPaging({
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number,
          isLastPage: data.last,
          isFirstPage: data.first,
        });
        
        if (data.content.length < pageSize || data.last) {
          setHasMore(false);
        } else {
          setCurrPage(prevPage => prevPage + 1);
        }
      } else {
        console.error('등록 실패:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [currPage, pageSize, loading, hasMore]);

  // 컴포넌트 마운트 시 첫 데이터 로드
  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver를 이용한 무한스크롤 설정
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMembers();
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [loading, hasMore, fetchMembers]);

  // 수정/삭제 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editMenuRef.current && !editMenuRef.current.contains(event.target)) {
        setShowEditMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEditMenu]);

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleEditButton = (index) => {
    if (showEditMenu === index) {
      setShowEditMenu(null);
    } else {
      setShowEditMenu(index);
      setShowModification(false);
    }
  };

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
    <div className={styles.main}>
      <div className={styles.title}>훈련생 리스트</div>
      <div className={styles.btns}>
        <button className={styles.registerBtn} onClick={handleRegistrationClick}>훈련생 등록</button>
        {showRegistration && (
          <Trainee_Registration onClose={handleCloseRegistration} />
        )}
        <div className={styles.searchContainer}>
          <select
            name='status'
            className={styles.dropdown}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <option value="">훈련생 상태</option>
            <option value="1">훈련중</option>
            <option value="2">중도탈락</option>
            <option value="3">중도포기</option>
            <option value="4">취업완료</option>
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
          />
          <button className={styles.icon}>
            <i className='fas fa-magnifying-glass' />
          </button>
        </div>
      </div>
      <div className={styles.tableHeader}>
        <div>사진</div>
        <div>고유번호</div>
        <div>이름</div>
        <div>전화번호</div>
        <div>신청과정</div>
        <div>등록일</div>
        <div>상태</div>
        <div>수정 / 삭제</div>
      </div>
      <table className={styles.tableBody}>
        <tbody>
          {members.map((member) => (
            <tr key={member.traineeId} className={styles.tr}>
              <td className={styles.photo} style={{ borderLeft: `10px solid ${getCourseColor(member.course)}`, overflow: 'hidden' }}>
                <img src={`${member.upfilePath}${member.upfileName}`} alt='' />
              </td>
              <td>{member.traineeId}</td>
              <td>{member.name}</td>
              <td>{member.tel}</td>
              <td>{member.course?.name || '정보 없음'}</td>
              <td>{member.crtDate}</td>
              <td>{status[member.status]}</td>
              <td>
                <button onClick={() => handleEditButton(member.traineeId)} className={styles.edit}>···</button>
                {showEditMenu === member.traineeId && (
                  <div ref={editMenuRef} className={styles.editMenu}>
                    <Link to={`/trainee_modify/${member.traineeId}`} className={styles.modify}>수정</Link>
                    <Link to={`/trainee_delete/${member.traineeId}`} className={styles.delete}>삭제</Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div ref={observerRef} style={{ height: "3px" }} />
      {loading && <p style={{ textAlign: 'center', marginTop: '0' }}>Loading...</p>}
      {!hasMore && ''}
    </div>
  );
};

export default Ttrainee_list;
