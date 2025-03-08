import styles from './Course_manage.module.css';
import Course_manage_contentsbox1 from './Course_manege_contentsbox1';
import Course_manage_contentsbox2 from './Course_manege_contentsbox2';
import Course_manage_contentsbox3 from './Course_manege_contentsbox3';
import Course_manage_contentsbox4 from './Course_manege_contentsbox4';
import Course_manage_contentsbox5 from './Course_manege_contentsbox5';
import Course_manage_contentsbox6 from './Course_manege_contentsbox6';
import Course_manage_contentsbox7 from './Course_manege_contentsbox7';
import Course_manage_contentsbox8 from './Course_manege_contentsbox8';


const Course_manage = () => {


    console.log("Course_manage() invoked.");

    return (
        <div className={styles.main}>
            
            <div className={styles.headline}>과정 관리</div>

            <div className={styles.search}>

                <section className={styles.drop1}>구분</section>
                <section className={styles.drop2}>항목</section>

                <div className={styles.search_bar}></div>

            </div>

            <button className={styles.register}>과정 등록</button>
            
            <div className={styles.contentsboxlist1}>
                <Course_manage_contentsbox1/>
                <Course_manage_contentsbox2/>
                <Course_manage_contentsbox3/>
                <Course_manage_contentsbox4/>
            </div>
            <div className={styles.contentsboxlist2}>
                <Course_manage_contentsbox5/>
                <Course_manage_contentsbox6/>
                <Course_manage_contentsbox7/>
                <Course_manage_contentsbox8/>
            </div>

        </div>
    )

}

export default Course_manage;