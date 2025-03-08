import styles from './Course_manage.module.css';

const Course_manage_contentsbox5 = () => {

    return (
        <div className={styles.contentsbox}>

                <div className={styles.contents_head2}>구분</div>

                <div className={styles.img_box}>
                    <p>과정 이미지</p>
                    <div className={styles.state}>예정</div>
                </div>

                <div className={styles.course_name}>과정명</div>

                <div className={styles.date}>2025.1.1 ~ 2025.1.31</div>

                <div className={styles.footer}>
                     <div className={styles.instructorname}>홍길동</div>
                     <div className={styles.instructor}>강사</div>
                     <div className={styles.enrollment}>수강인원/정원</div>
                </div>

         </div>    
    )
}

export default Course_manage_contentsbox5;