
import styles from './Course_modify.module.css';

const Course_modify = ({onClose,onModify}) => {
    console.log("Course_modify() invoked.");

    return(
        <div className={styles.main}>
            <div className={styles.leftbox}>
                <div className={styles.titletext}>과정 정보 관리</div>
                <div className={styles.dropdown}>구분 
                    <input ></input> 
                </div>
                <div className={styles.inputbox}>과정명
                    <input ></input> 
                </div>
                <div className={styles.inputbox}>강사명
                    <input ></input> 
                </div>
                <div className={styles.inputbox}>수강시작|수강종료
                    <input ></input> 
                </div>
                <div className={styles.inputbox}>수강 정원
                    <input></input> 
                </div>
            </div>

            <div className={styles.rightbox}>
                <div className={styles.file}></div>
                <div className={styles.contentbox}></div>
                <div className={styles.buttonbox}>
                    <button onClick={onModify} className={styles.savebutton}>저장</button>
                    <button onClick={onClose} className={styles.cancelbutton}>취소</button>
                </div>
            </div>
        </div>
    )

}

export default Course_modify;