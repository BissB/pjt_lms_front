import { useNavigate } from 'react-router-dom';
import styles from './Course_register.module.css';

const Course_register = () => {
    console.log("Course_register() invoked.");

    const navigate = useNavigate();

    const onClose = () => {
        navigate("/course_overview");
    }

    const handleRegisterConfirm = async () => {
        // if (!selectedCourseId) return;
       
    try {
        const response = await fetch(`https://localhost:443/course/register`, {
        method: "POST",
        // body: JSON.stringify({ })
        });

        if (response.ok) {
            alert("수정되었습니다.");
            // setCourses(prevCourses => prevCourses.filter(course => course.id !== selectedCourseId));
        } else {
            alert("수정 실패: ");
        }
    } catch (error) {
        console.error("수정 오류:", error);
        // alert("수정 중 오류가 발생했습니다.");
    }

    onClose();
    };

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.leftbox}>
                    <div className={styles.titletext}>과정 정보 관리</div>
                    <div className={styles.dropdown}>구분 
                        <select>
                            <option>선택</option>
                            <option>국비</option>
                            <option>일반</option>
                        </select>
                    </div>
                    <div className={styles.inputcontainer}>과정명
                        <input className={styles.inputbox}></input> 
                    </div>
                    <div className={styles.inputcontainer}>강사명
                        <input className={styles.inputbox}></input> 
                    </div>
                    <div className={styles.inputcontainer}>수강시작|수강종료
                        <input className={styles.inputbox}></input> 
                    </div>
                    <div className={styles.inputcontainer}>수강 정원
                        <input className={styles.inputbox}></input> 
                    </div>
                </div>

                <div className={styles.rightbox}>
                    <input className={styles.file} type='file'/>
                    <textarea className={styles.contentbox}/>
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