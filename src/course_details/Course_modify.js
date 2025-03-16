import { useState, useEffect } from "react";
import { useNavigate , useParams } from 'react-router-dom';

import styles from './Course_modify.module.css';

const Course_modify = () => {
    console.log("Course_modify() invoked.");

    const navigate = useNavigate();
    const { courseId } = useParams(); // URL에서 courseId 가져오기

    /// 수정 팝업 닫고 디테일로 이동 //////////////////////////////////////////////////////////////////////////////////////////
    const onClose = () => {
        navigate(`/course_detail/${courseId}`);
    }

    /// 수정할 데이터  //////////////////////////////////////////////////////////////////////////////////////////
    const [modifyFormData, setModifyFormData] = useState({
        type: "",
        name: "",
        startDate: "",
        endDate: "",
        currCount: "",
        capacity: "",
        detail: "",
        status:"",
        fileName:"",
    });

    const [modifyFile, setModifyFile] = useState(null);

    // 📌 **백엔드에서 기존 데이터를 가져오기**
    useEffect(() => {
         fetch(`https://localhost:443/course/${courseId}`)
            .then((response) => response.json())
            .then((data) => {
                setModifyFormData({
                   type: data.type || "",
                   name: data.name || "",
                   startDate: data.startDate || "",
                   endDate: data.endDate || "",
                   capacity: data.capacity || "",
                   currCount: data.currCount || "",
                   detail: data.detail || "",
                   status: data.status || "",
                   fileName: data.upfile[0]?.original || "선택한 파일 없음"
               });
           })
           .catch((error) => console.error("데이터 불러오기 실패:", error));
    }, [courseId]);

    // 📌 **입력값이 변경될 때 상태 업데이트**
    
    const handleChange = (field, value) => {
        setModifyFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];  // 첫 번째 파일 선택
        if (file) {
            setModifyFile(file);
        }
    };

    /// 수정 확인 //////////////////////////////////////////////////////////////////////////////////////////
    const handleModifyConfirm = async () => {
       
        try {
            const formData = new FormData();
            formData.append("type", modifyFormData.type);
            formData.append("name", modifyFormData.name);
            formData.append("startDate", modifyFormData.startDate);
            formData.append("endDate", modifyFormData.endDate);
            formData.append("capacity", modifyFormData.capacity);
            formData.append("currCount", modifyFormData.currCount);
            formData.append("detail", modifyFormData.detail);
            formData.append("status", modifyFormData.status);

            if (modifyFile) {
                formData.append("upfiles", modifyFile);
            }

            const response = await fetch(`https://localhost:443/course/${courseId}`, {
                method: "POST",
                body: formData,
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
                    <div className={styles.selectcontainer}>
                        <div className={styles.dropdown}>구분 
                            <select value={modifyFormData.type} className={styles.select} name= "type"
                            onChange={(e) => handleChange("type", e.target.value)}>
                                <option value="">선택</option>
                                <option value="1">NCS</option>
                                <option value="2">KDT</option>
                                <option value="3">산대특</option>
                                <option value="4">미정</option>
                            </select>
                        </div>
                        <div className={styles.dropdown}>상태 
                            <select value={modifyFormData.status} className={styles.select} name= "status"
                            onChange={(e) => handleChange("status", e.target.value)}>
                                <option value="">선택</option>
                                <option value="1">진행예정</option>
                                <option value="2">진행중</option>
                                <option value="3">폐지</option>
                                <option value="4">진행종료</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.inputcontainer}>과정명
                        <input className={styles.inputbox} name="name"  value={modifyFormData.name} onChange={(e) => handleChange("name", e.target.value)}></input> 
                    </div>
                    <div className={styles.datebox}>
                        <div className={styles.dateinputcontainer1} >수강시작일
                            <input className={styles.dateinputbox} name="startDate" value={modifyFormData.startDate} onChange={(e) => handleChange("startDate", e.target.value)}></input> 
                        </div>
                        <div className={styles.dateinputcontainer2} >수강종료일
                            <input className={styles.dateinputbox} name="endDate" value={modifyFormData.endDate} onChange={(e) => handleChange("endDate", e.target.value)}></input> 
                        </div>
                    </div>
                    <div className={styles.inputcontainer}>수강 정원
                        <input className={styles.inputbox} name="capacity" value={modifyFormData.capacity} onChange={(e) => handleChange("capacity", e.target.value)}></input> 
                    </div>
                    <div className={styles.inputcontainer}>현재 인원
                         <input className={styles.inputbox} name="currCount" value={modifyFormData.currCount} disabled></input> 
                    </div> 
                </div>

                <div className={styles.rightbox}>
                    <input className={styles.file} name="upfiles" type='file' onChange={handleFileChange} />
                    <div className={styles.fileName}>기존 파일 이름: {modifyFormData.fileName}</div>
                    <p className={styles.contentboxheadline}>&lt; 내용 &gt;</p>
                    <textarea className={styles.contentbox} name="detail" value={modifyFormData.detail} onChange={(e) => handleChange("detail", e.target.value)}/>
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