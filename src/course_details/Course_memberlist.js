import React, { useState, useEffect, useRef } from "react";
import styles from "./Course_memberlist.module.css";

const Course_memberlist = () => {
    const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    // 🚀 새로운 <div> 요소 추가
    const loadMoreItems = () => {
        setLoading(true);
        setTimeout(() => {
            setItems((prevItems) => [...prevItems, ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1)]);
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
            { threshold: 0.3 }  // 0.5: 50% 보이면 콜백 호출
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [loading]);

    return (
        <div className={styles.scroolContainer}>
            {items.map((item) => (
                <div key={item} className={styles.item}>
                    Item {item}
                    <button className={styles.itembtn}>
                        <i className={`fa-solid fa-chevron-down ${styles.itemicon}`}></i>
                    </button>
                </div>
            ))}
            <div ref={observerRef} className={styles.empty} />
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Course_memberlist;