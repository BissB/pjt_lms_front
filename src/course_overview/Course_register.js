import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Course_register.module.css';

const Course_register = () => {
    console.log("Course_register() invoked.");

    const navigate = useNavigate();

    const onClose = () => {
        navigate("/course_overview");
    }

    const [RegisterData, setResiterData] = useState({
            type: "",
            name: "",
            startDate: "",
            endDate: "",
            capacity: "",
            detail: ""
    });

    const [RegisterFile, setRegisterFile] = useState(null);


    const handleChange = (e) => {
        setResiterData({ ...RegisterData, [e.target.name]: e.target.value });
    };

 
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setRegisterFile(file);
    };

    const handleRegisterConfirm = async () => {

        if (!RegisterData.type || !RegisterData.name  || !RegisterData.startDate || !RegisterData.endDate || !RegisterData.capacity || !RegisterData.detail) {
            alert("모든 필수 정보를 입력하세요.");
            return;
        }
        
        const formData = new FormData();
        formData.append("type", RegisterData.type);
        formData.append("name", RegisterData.name);
        formData.append("startDate", RegisterData.startDate);
        formData.append("endDate", RegisterData.endDate);
        formData.append("capacity", RegisterData.capacity);
        formData.append("detail", RegisterData.detail);
        if (RegisterFile) {
            formData.append("upfiles", RegisterFile);
        }
        
        console.log("RegisterData:", RegisterData);
        console.log("RegisterFile:", RegisterFile);

        try {
            const response = await fetch(`https://localhost:443/course`, {
            method: "PUT", // 현재 등록은 PUT
            body: formData,
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
                    <input className={styles.file} name="file" type='file' onChange={handleFileChange}/>
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