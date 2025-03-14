import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Course_register.module.css';

const Course_register = () => {
    console.log("Course_register() invoked.");

    const navigate = useNavigate();

    const onClose = () => {
        navigate("/course_overview");
    }

    const [formData, setFormData] = useState({
            type: "",
            name: "",
            instructor: "",
            startDate: "",
            endDate: "",
            capacity: "",
            detail: "",
            upfiles: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prev) => ({ ...prev, file }));
    };

    const handleRegisterConfirm = async () => {

        if (!formData.type || !formData.name  || !formData.startDate || !formData.endDate || !formData.capacity || !formData.detail) {
            alert("모든 필수 정보를 입력하세요.");
            return;
        }
        
        const data = new FormData();
        data.append("type", formData.type);
        data.append("name", formData.name);
        data.append("instructor", formData.instructor);
        data.append("startDate", formData.startDate);
        data.append("endDate", formData.endDate);
        data.append("capacity", formData.capacity);
        data.append("detail", formData.detail);
        if (formData.upfiles) {
           data.append("upfiles", formData.upfiles);
        }
        
        console.log("formData:", formData );

        try {
            const response = await fetch(`https://localhost:443/course`, {
            method: "PUT", // 현재 등록은 PUT
            body: data,
            });

            if (response.ok) {
                alert("등록되었습니다.");
            } else {
                alert("등록 실패: ");
            }
        } catch (error) {
            console.error("등록 오류:", error);
        }

       onClose();
    };

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.leftbox}>
                    <div className={styles.titletext}>과정 등록</div>
                    <div className={styles.dropdown}>구분 
                        <select name="type" className={styles.select} onChange={handleChange}>
                            <option value="">선택</option>
                            <option value="1">NCS</option>
                            <option value="2">KDT</option>
                            <option value="3">산대특</option>
                            <option value="4">미정</option>
                        </select>
                    </div>
                    <div className={styles.inputcontainer}
                    >과정명
                        <input name="name" className={styles.inputbox} placeholder="필수 입력" onChange={handleChange}></input> 
                    </div>
                    <div className={styles.inputcontainer}>강사명
                        <input name="instructor" className={styles.inputbox} placeholder="필수 입력" onChange={handleChange}></input> 
                    </div>
                    <div className={styles.datebox}>
                        <div className={styles.dateinputcontainer1}>수강시작일
                            <input name="startDate" className={styles.dateinputbox} placeholder="예) 2025-01-01" onChange={handleChange}></input> 
                        </div>
                        <div className={styles.dateinputcontainer2}>수강종료일
                            <input name="endDate" className={styles.dateinputbox} placeholder="예) 2025-01-01" onChange={handleChange}></input> 
                        </div>
                    </div>
                    <div className={styles.inputcontainer}>수강 정원
                        <input name="capacity" className={styles.inputbox} placeholder="필수 입력" onChange={handleChange}></input> 
                    </div>
                </div>

                <div className={styles.rightbox}>
                    <input className={styles.file} type='file' onChange={handleFileChange}/>
                    <p className={styles.contentboxheadline}>&lt; 내용 &gt;</p>
                    <textarea name="detail" className={styles.contentbox} onChange={handleChange}/>
                    <div className={styles.buttonbox}>
                        <button onClick={handleRegisterConfirm} className={styles.savebutton}>저장</button>
                        <button onClick={onClose} className={styles.cancelbutton}>취소</button>
                    </div> 
                </div>
            </div>
        </div>
    )

}

export default Course_register;