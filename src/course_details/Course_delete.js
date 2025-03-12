
import styles from './Course_delete.module.css';

const Course_delete = ({onClose}) => {
    console.log("Course_delete() invoked.");

    // 실제 삭제 요청
    const handleDeleteConfirm = async () => {
        // if (!selectedCourseId) return;
        
    try {
        const response = await fetch(`https://localhost:443/course/delete`, {
        method: "POST",
        // body: JSON.stringify({ })
        });

        if (response.ok) {
            alert("삭제되었습니다.");
            // setCourses(prevCourses => prevCourses.filter(course => course.id !== selectedCourseId));
        } else {
            alert("삭제 실패: ");
        }
    } catch (error) {
        console.error("삭제 오류:", error);
        // alert("삭제 중 오류가 발생했습니다.");
    }

    onClose(); // 팝업 닫기
    };

    return(
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.deletetext}>정말 이 과정을 삭제하시겠습니까?</div>
                <div className={styles.buttonbox}>
                    <button onClick={handleDeleteConfirm} className={styles.yesnobutton}>예</button>
                    <button onClick={onClose} className={styles.yesnobutton}>아니오</button>
                </div>
            </div>
        </div>
    )

}

export default Course_delete;