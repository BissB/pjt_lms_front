import styles from './Course_check.module.css';  

const Course_check = () => {
    console.log("Course_check() invoked.");

    return(
        <>
        <div className={styles.main}>
                <div className={styles.topbox}>
                    <div className={styles.top_leftbox}>
                        <div className={styles.imgbox}></div>
                        <div className={styles.modify_button}></div>
                        <div className={styles.delete_button}></div>
                    </div>
                    <div className={styles.top_rightbox}>
                        
                    </div>
                </div>
                <div className={styles.bottombox}>
                   
                </div>
        </div>
        </>
    )

}

export default Course_check;