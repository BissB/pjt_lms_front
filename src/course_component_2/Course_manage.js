import stylse from './Course_manage.module.css';


const Course_manage = () => {


    console.log("Course_manage() invoked.");

    return (
        <div className={stylse.main}>
            
            <div className={stylse.headline}>과정 관리</div>

            <div className={stylse.search}>

                <section className={stylse.drop1}>구분</section>
                <section className={stylse.drop2}>항목</section>

                <div className={stylse.search_bar}></div>

            </div>

            <button className={stylse.register}>과정 등록</button>
            
            <div className={stylse.contentsboxlist}>
                <div className={stylse.contentsbox}>

                    <div className={stylse.contents_head}>구분</div>

                    <div className={stylse.img_box}>
                        <div className={stylse.state}>예정</div>
                    </div>

                    <div className={stylse.course_name}>과정명</div>

                    <div className={stylse.date}>2025.1.1 ~ 2025.1.31</div>

                    <div className={stylse.footer}>
                        <div className={stylse.instructor}>홍길동</div>
                        <div className={stylse.enrollment}>수강인원/정원</div>
                    </div>

                </div>    
            </div>

        </div>
    )

}

export default Course_manage;