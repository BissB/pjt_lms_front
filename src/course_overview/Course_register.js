import { useNavigate } from 'react-router-dom';
import styles from './Course_register.module.css';

const Course_register = () => {
    console.log("Course_register() invoked.");

    const navigate = useNavigate();

    const onClose = () => {
        navigate("/course_overview");
    }

    // const [formData, setFormData] = useState({
    //         type: "",
    //         name: "",
    //         instructor: "",
    //         startDate: "",
    //         endDate: "",
    //         capacity: "",
    //         detail: "",
    //         file:""
    // });

//     const handleRegisterConfirm = async () => {

//         if (!courseName || !instructorName || !startDate || !endDate || !capacity) {
//             alert("모든 필수 정보를 입력하세요.");
//             return;
//         }
        
//         const data = new FormData();
//         data.append("courseType", courseType);
//         data.append("courseName", courseName);
//         data.append("instructorName", instructorName);
//         data.append("startDate", startDate);
//         data.append("endDate", endDate);
//         data.append("capacity", capacity);
//         data.append("description", description);
// //        if (file) {
// //           formData.append("file", file);
// //        }

//         try {
//             const response = await fetch(`https://localhost:443/course`, {
//             method: "PUT",
//             });

//             if (response.ok) {
//                 alert("등록되었습니다.");
//             } else {
//                 alert("등록 실패: ");
//             }
//         } catch (error) {
//             console.error("등록 오류:", error);
//         }

//         onClose();
//     };

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.leftbox}>
                    <div className={styles.titletext}>과정 등록</div>
                    <div className={styles.dropdown}>구분 
                        <select className={styles.select}>
                            <option>선택</option>
                            <option>풀스택</option>
                            <option>프론트엔드</option>
                            <option>백엔드</option>
                        </select>
                    </div>
                    <div className={styles.inputcontainer}
                    >과정명
                        <input className={styles.inputbox} placeholder="필수 입력" ></input> 
                    </div>
                    <div className={styles.inputcontainer}>강사명
                        <input className={styles.inputbox} placeholder="필수 입력" ></input> 
                    </div>
                    <div className={styles.datebox}>
                        <div className={styles.dateinputcontainer1}>수강시작일
                            <input className={styles.dateinputbox} placeholder="필수 입력" ></input> 
                        </div>
                        <div className={styles.dateinputcontainer2}>수강종료일
                            <input className={styles.dateinputbox} placeholder="필수 입력" ></input> 
                        </div>
                    </div>
                    <div className={styles.inputcontainer}>수강 정원
                        <input className={styles.inputbox} placeholder="필수 입력"></input> 
                    </div>
                </div>

                <div className={styles.rightbox}>
                    <input className={styles.file} type='file'/>
                    <p className={styles.contentboxheadline}>&lt; 내용 &gt;</p>
                    <textarea className={styles.contentbox}/>
                    {/* <div className={styles.buttonbox}>
                        <button onClick={handleRegisterConfirm} className={styles.savebutton}>저장</button>
                        <button onClick={onClose} className={styles.cancelbutton}>취소</button>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default Course_register;