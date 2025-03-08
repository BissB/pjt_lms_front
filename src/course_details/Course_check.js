import React, { useState, useEffect } from 'react';

import styles from './Course_check.module.css';  
import Course_info from './Course_info';
import Course_content from './Course_content';

const Course_check = () => {
    console.log("Course_check() invoked.");

    // 과정 조회 데이터 ///////////////////////////////////////////////////////////////////////////////////////

    const [formData, setFormData] = useState({
        category: "",
        startDate: "",
        courseName: "",
        endDate: "",
        instructor: "",
        capacity: "",
        content: ""
    });

   
    useEffect(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
        fetch("/api/courseData")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("서버 응답 오류");
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    category: data?.category || "",
                    startDate: data?.startDate || "",
                    courseName: data?.courseName || "",
                    endDate: data?.endDate || "",
                    instructor: data?.instructor || "",
                    capacity: data?.capacity || "",
                    content: data.content || "",
                });
            })
            .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
            });
    }, []);


    const handleChange = (field) => (e) => {        // field를 받아서 e.target.value를 formData에 넣어줌
        setFormData((prev) => ({                    
            ...prev,
            [field]: e.target.value                 
        }));
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    
   
    return(
        <>
        <div className={styles.main}>
                <div className={styles.topbox}>

                    <div className={styles.top_leftbox}>

                        <button className={styles.backbutton}><i class="fa-solid fa-chevron-left fa-2x"></i></button>
                        <div className={styles.imgbox}></div>
                        <div className={styles.buttonbox}>
                            <button className={styles.regist_button}>등록</button>
                            <button className={styles.modify_button}>수정</button>
                        </div>

                    </div>

                    <div className={styles.top_rightbox}>
                        <div className={styles.inputboxes}>
                            <Course_info label="구분" value={formData.category} onChange={(e) => handleChange("category", e.target.value)} />
                            <Course_info label="수강시작" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
                            <Course_info label="과정명" value={formData.courseName} onChange={(e) => handleChange("courseName", e.target.value)} />
                            <Course_info label="수강종료" value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
                            <Course_info label="강사명" value={formData.instructor} onChange={(e) => handleChange("instructor", e.target.value)} />
                            <Course_info label="수강정원" value={formData.capacity} onChange={(e) => handleChange("capacity", e.target.value)} />                    
                        </div>
                        <Course_content value={formData.content} onChange={(e) => handleChange("content", e.target.value)} />
                    </div>
                  

                </div>

                <div className={styles.bottombox}>
                   
                </div>
        </div>
        </>
    )

}

export default Course_check;