
import styles from './Course_delete.module.css';

const Course_delete = ({onClose,onDelete}) => {
    console.log("Course_delete() invoked.");

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.deletetext}>정말 이 과정을 삭제하시겠습니까?</div>
                <div className={styles.buttonbox}>
                    <button onClick={onDelete} className={styles.yesnobutton}>예</button>
                    <button onClick={onClose} className={styles.yesnobutton}>아니오</button>
                </div>
            </div>
        </div>
    )

}

export default Course_delete;