
import styles from './Course_modify.module.css';

const Course_modify = ({onClose,onModify}) => {
    console.log("Course_modify() invoked.");

    return(
        <div className={styles.main}>
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
                    <button onClick={onModify} className={styles.savebutton}>저장</button>
                    <button onClick={onClose} className={styles.cancelbutton}>취소</button>
                </div>
            </div>
        </div>
    )

}

export default Course_modify;