import React, { useState, useEffect } from 'react';

import styles from './Course_check.module.css';  
import Course_info from './Course_info';
import Course_content from './Course_content';
import Course_delete from './Course_delete';
import Course_modify from './Course_modify';

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

   
    // useEffect(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
    //     fetch(`http://localhost:8080/project/courseData/${courseId}`)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("서버 응답 오류");
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setFormData({
    //                 category: data?.category || "",
    //                 startDate: data?.startDate || "",
    //                 courseName: data?.courseName || "",
    //                 endDate: data?.endDate || "",
    //                 instructor: data?.instructor || "",
    //                 capacity: data?.capacity || "",
    //                 content: data.content || "",
    //             });
    //         })
    //         .catch((error) => {
    //             console.error("데이터 불러오기 실패:", error);
    //         });
    //         // fetchData();    // *** db에서 데이터 받아오기 ***굼금! 
    // }, []);


    const handleChange = (field) => (e) => {        // field를 받아서 e.target.value를 formData에 넣어줌
        setFormData((prev) => ({                    
            ...prev,
            [field]: e.target.value                 
        }));
    };

    //// 수정 팝업////////////////////////////////////////////////////////////////////////////////////////////////
    const [showModifyPopup, setShowModifyPopup] = useState(false);
      
    const handleModifyShowPopup = () => {
        if(showDeletePopup) setShowDeletePopup(false);
        setShowModifyPopup(true);  // 팝업 보이기
    };
    
    const handleModifyClosePopup = () => {
        setShowModifyPopup(false);  // 팝업 닫기
    };

    const handleModify = () => {
        alert("수정되었습니다!");  // 저장 처리 예시
        setShowModifyPopup(false);  // 팝업 닫기
    };

    //// 삭제 팝업////////////////////////////////////////////////////////////////////////////////////////////////

    const [showDeletePopup, setShowDeletePopup] = useState(false);  // 팝업 상태
    const [selectedCourseId, setSelectedCourseId] = useState(null); // 삭제할 courseId 저장


    // 삭제 버튼 클릭 시 팝업 표시
    const handleDeleteShowPopup = () => {
        if(showModifyPopup) setShowModifyPopup(false);
        setShowDeletePopup(true);
    };

    // 팝업 닫기
    const handleDeleteClosePopup = () => {
        setShowDeletePopup(false);
    };

    // 실제 삭제 요청
    const handleDeleteConfirm = async () => {
        if (!selectedCourseId) return;
        
        try {
            const response = await fetch(`http://localhost:8080/course/${selectedCourseId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("삭제되었습니다.");
                // setCourses(prevCourses => prevCourses.filter(course => course.id !== selectedCourseId));
            } else {
                alert("삭제 실패: " + response.status);
            }
        } catch (error) {
            console.error("삭제 오류:", error);
            // alert("삭제 중 오류가 발생했습니다.");
        }

        handleDeleteClosePopup(); // 팝업 닫기
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
   
    return(

        <div className={styles.main}>
        
            {showDeletePopup && <Course_delete onClose={handleDeleteClosePopup} onDelete={handleDeleteConfirm} />}
            {showModifyPopup && <Course_modify onClose={handleModifyClosePopup} onModify={handleModify} />}

            <div className={styles.topbox}>

                <div className={styles.top_leftbox}>

                    <button className={styles.backbutton}><i class="fa-solid fa-chevron-left fa-2x"></i></button>
                    <div className={styles.imgbox}></div>
                    <div className={styles.buttonbox}>
                        <button className={styles.modify_button} onClick={handleModifyShowPopup}>수정</button>
                        <button className={styles.delete_button} onClick={handleDeleteShowPopup}>삭제</button> 
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
    )

}


export default Course_check;