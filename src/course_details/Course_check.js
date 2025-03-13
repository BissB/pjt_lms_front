import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


import styles from './Course_check.module.css';  
import Course_info from './Course_info';
import Course_content from './Course_content';
import Course_delete from './Course_delete';
import {Member}  from '../member_list';
import { useParams } from "react-router-dom";

const Course_check = () => {
    console.log("Course_check() invoked.");

    const navigate = useNavigate();
    // 과정 조회 데이터 ///////////////////////////////////////////////////////////////////////////////////////
    const {courseId} = useParams(); // 과정 코드 받아오기

    const [formData, setFormData] = useState({
        type: "",
        name: "",
        instructor: "",
        startDate: "",
        endDate: "",
        capacity: "",
        currCount: "",
        detail: ""
    });

   
    useEffect(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
        console.log("courseId:", courseId);
        fetch(`https://localhost:443/course/${courseId}`)
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

    //// 수정 팝업////////////////////////////////////////////////////////////////////////////////////////////////
      
    const handleModifyShowPopup = () => {
        navigate(`/course/update/${courseId}`);
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

                     <button className={styles.backbutton} onClick={()=> navigate("/course_overview")}><i class="fa-solid fa-chevron-left fa-1.8x"></i></button> {/* 뒤로가기 버튼 */}
                     <div className={styles.imgbox}></div>
                     <div className={styles.buttonbox}>      
                         <button className={styles.modify_button} onClick={handleModifyShowPopup}>수정</button>
                         <button className={styles.delete_button} onClick={handleDeleteShowPopup}>삭제</button> 
                     </div>

                </div>

                <div className={styles.top_rightbox}>
                    <div className={styles.inputboxes}>
                        <Course_info label="구분" value={formData.type} disabled/>
                        <Course_info label="수강시작일" value={formData.startDate} disabled/>
                        <Course_info label="과정명" value={formData.name} disabled/>
                        <Course_info label="수강종료일" value={formData.endDate} disabled/>
                        <Course_info label="강사명" value={formData.instructor} disabled/>
                        <Course_info  label={`수강정원 (현재인원: ${formData.currCount}명)`} value={formData.capacity} disabled/>
                    </div>
                    <Course_content label="내용" value={formData.detail} disabled/>
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