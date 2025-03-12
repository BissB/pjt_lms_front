import { useState, useEffect } from "react";
import { useNavigate , useParams } from 'react-router-dom';

import styles from './Course_modify.module.css';

const Course_modify = () => {
    console.log("Course_modify() invoked.");

    const navigate = useNavigate();
    const { courseId } = useParams(); // URL에서 courseId 가져오기

    /// 수정 팝업 닫고 디테일로 이동 //////////////////////////////////////////////////////////////////////////////////////////
    const onClose = () => {
        navigate("/course_detail");
    }

    /// 수정할 데이터  //////////////////////////////////////////////////////////////////////////////////////////
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        instructor: "",
        startDate: "",
        endDate: "",
        currCount: "",
        capacity: "",
        detail: "",
    });

    // 📌 **백엔드에서 기존 데이터를 가져오기**
    //  useEffect(() => {
    //     fetch(`http://localhost:443/course/read/${courseId}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setFormData({
    //                 type: data.type || "",
    //                 name: data.name || "",
    //                 instructor: data.instructor || "",
    //                 startDate: data.startDate || "",
    //                 endDate: data.endDate || "",
    //                 capacity: data.capacity || "",
    //                 currCount: data.currCount || "",
    //                 detail: data.detail || "",
    //             });
    //         })
    //         .catch((error) => console.error("데이터 불러오기 실패:", error));
    // }, [courseId]);

    // 📌 **입력값이 변경될 때 상태 업데이트**
    
    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };


    /// 수정 확인 //////////////////////////////////////////////////////////////////////////////////////////
    const handleModifyConfirm = async () => {
       
    try {
        const response = await fetch(`https://localhost:443/course/update/${courseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("수정되었습니다.");
            navigate(`/course_detail/${courseId}`);
        } else {
            alert("수정 실패: ");
        }
    } catch (error) {
        console.error("수정 오류:", error);
        // alert("수정 중 오류가 발생했습니다.");
    }

    onClose();
    };

    /// /////////////////////////////////////////////////////////////////////////////////////////////
    
    

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.leftbox}>
                    <div className={styles.titletext}>과정 정보 관리</div>
                    <div className={styles.dropdown}>구분 
                        <select value={formData.type} onChange={(e) => handleChange("type", e.target.value)}>
                            <option value="">선택</option>
                            <option value="frontend">프론트</option>
                            <option value="backend">백엔드</option>
                            <option value="fullstack">풀스택</option>
                        </select>
                    </div>
                    <div className={styles.inputcontainer}>과정명
                        <input className={styles.inputbox}  value={formData.name} onChange={(e) => handleChange("name", e.target.value)}></input> 
                    </div>
                    <div className={styles.inputcontainer}>강사명
                        <input className={styles.inputbox} value={formData.instructor} onChange={(e) => handleChange("instructor", e.target.value)}></input> 
                    </div>
                    <div className={styles.inputcontainer} >수강시작일
                        <input className={styles.inputbox} value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)}></input> 
                    </div>
                    <div className={styles.inputcontainer} >수강종료일
                        <input className={styles.inputbox} value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)}></input> 
                    </div>
                    <div className={styles.inputcontainer}>수강 정원
                        <span className={styles.capacity}>(현재인원: {formData.currCount}명)</span> 
                        <input className={styles.inputbox} value={formData.capacity} onChange={(e) => handleChange("capacity", e.target.value)}></input> 
                    </div>
                </div>

                <div className={styles.rightbox}>
                    <input className={styles.file} type='file'/>
                    <textarea className={styles.contentbox} value={formData.detail} onChange={(e) => handleChange("detail", e.target.value)}/>
                    <div className={styles.buttonbox}>
                        <button onClick={handleModifyConfirm} className={styles.savebutton}>저장</button>
                        <button onClick={onClose} className={styles.cancelbutton}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Course_modify;