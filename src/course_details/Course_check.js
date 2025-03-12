import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import styles from './Course_check.module.css';  
import Course_info from './Course_info';
import Course_content from './Course_content';
import Course_delete from './Course_delete';
import Course_modify from './Course_modify';
import {Member}  from '../member_list';
import { useParams } from "react-router-dom";

const Course_check = () => {
    console.log("Course_check() invoked.");

    const navigate = useNavigate();
    // 과정 조회 데이터 ///////////////////////////////////////////////////////////////////////////////////////
    const {courseId} = useParams(); // 과정 코드 받아오기

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
        fetch(`http://localhost:443/course/read/${courseId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("서버 응답 오류");
                }
                return response.json();
            })
            .then((data) => {
                setFormData({
                    // upfiles: data?.upfiles || [],
                    type: data?.type || "",
                    name: data?.name || "",
                    instructor: data?.instructor || "",
                    startDate: data?.startDate || "",
                    endDate: data?.endDate || "",
                    currCount: data?.currCount || "",
                    capacity: data?.capacity || "",
                    detail: data.detail || "",
                });
            })
            .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
            });
            // fetchData();    // *** db에서 데이터 받아오기 ***굼금! 
    }, []);


    const handleChange = (field) => (e) => {        // field를 받아서 e.target.value를 formData에 넣어줌
        setFormData((prev) => ({                    
            ...prev,
            [field]: e.target.value      
        }));
    };

    //// 수정 팝업////////////////////////////////////////////////////////////////////////////////////////////////
      
    const handleModifyShowPopup = () => {
        navigate("/course_modify");
    };
    

    //// 삭제 팝업////////////////////////////////////////////////////////////////////////////////////////////////

    const [showDeletePopup, setShowDeletePopup] = useState(false);  // 팝업 상태


    // 삭제 버튼 클릭 시 팝업 표시
    const handleDeleteShowPopup = () => {
        setShowDeletePopup(true);
    };

    // 팝업 닫기
    const handleDeleteClosePopup = () => {
        setShowDeletePopup(false);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
   
    return(

        <div className={styles.main}>
        
            {showDeletePopup && <Course_delete onClose={handleDeleteClosePopup}/>}

            <div className={styles.topbox}>

                <div className={styles.top_leftbox}>

                    <button className={styles.backbutton} onClick={()=> navigate("/course_overview")}><i class="fa-solid fa-chevron-left fa-2x"></i></button> {/* 뒤로가기 버튼 */}
                    <div className={styles.imgbox}></div>
                    <div className={styles.buttonbox}>      
                        <button className={styles.modify_button} onClick={handleModifyShowPopup}>수정</button>
                        <button className={styles.delete_button} onClick={handleDeleteShowPopup}>삭제</button> 
                    </div>

                </div>

                <div className={styles.top_rightbox}>
                    <div className={styles.inputboxes}>
                        <Course_info label="구분" value={formData.type} onChange={(e) => handleChange("type", e.target.value)} />
                        <Course_info label="수강시작" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} />
                        <Course_info label="과정명" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                        <Course_info label="수강종료" value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)} />
                        <Course_info label="강사명" value={formData.instructor} onChange={(e) => handleChange("instructor", e.target.value)} />
                        <Course_info label="수강정원" value={formData.capacity} onChange={(e) => handleChange("capacity", e.target.value)} />                    
                    </div>
                    <Course_content value={formData.content} onChange={(e) => handleChange("content", e.target.value)} />
                </div>
                

            </div>

            <div className={styles.bottombox}>
                {/* <Course_memberlist/> */}
                {/* <Member /> */}
            </div>

        </div>
    )

}


export default Course_check;