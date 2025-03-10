import React, { useState, useEffect, useRef } from "react";
import styles from "./Course_memberlist.module.css";

const Course_memberlist = () => {
  const [selectedItem, setSelectedItem] = useState(null);  // 선택된 아이템의 상태 관리

  // 버튼 클릭 시, 해당 아이템의 정보를 표시
  const handleClick = (item) => {
    setSelectedItem(item);  // 클릭된 아이템을 상태에 저장
  };

  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => i + 1)
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  // 🚀 새로운 <div> 요소 추가
  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1),
      ]);
      setLoading(false);
    }, 1000);
  };

  // 🚀 Intersection Observer로 마지막 요소 감지
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.3 } // 0.5: 50% 보이면 콜백 호출
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      <div className={styles.tableHeader}>

        <div>사진</div>
        <div>회원번호</div>
        <div>이름 / 아이디</div>
        <div>전화번호</div>
        <div>신청과정</div>
        <div>등록일</div>
        <div>
          <i className={`fa-solid fa-chevron-down ${styles.itemicon}`}></i>
        </div>
      </div>

      <div className={styles.scroolContainer}>
        {items.map((item) => (
          <div key={item} className={styles.item}>
            Item {item}
            <button className={styles.itembtn} onClick={() => handleClick(item)}>
              <i className={`fa-solid fa-chevron-down ${styles.itemicon}`}></i>
            </button>
          </div>
        ))}

        {selectedItem && (
            <div className={styles.infoModal}>
            <p>Item {selectedItem} Information</p>
            <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
        )} 

        <div ref={observerRef} className={styles.empty} />{" "}
        {/* 감지요소 (이 부분이 감지되면 다음 스크롤 생성) */}
        {loading && <p>Loading...</p>}

           
      </div>

      
    </>
  );
};

export default Course_memberlist;
