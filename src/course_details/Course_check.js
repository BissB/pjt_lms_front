import styles from './Course_check.module.css';  

const Course_check = () => {
    console.log("Course_check() invoked.");

    /*
    const [inputValue, setInputValue] = useState(""); // 입력값 상태 관리

    // 백엔드에서 데이터 가져오기
    useEffect(() => {
    fetch("http://localhost:5000/api/getText") // 백엔드 API 호출
      .then((response) => response.json()) // JSON 변환
      .then((data) => {
        setInputValue(data.text); // 받아온 값으로 상태 업데이트
      })
      .catch((error) => console.error("Error:", error));
     }, []);
    */
   
    return(
        <>
        <div className={styles.main}>
                <div className={styles.topbox}>

                    <div className={styles.top_leftbox}>

                        <button className={styles.backbutton}><i class="fa-solid fa-chevron-left fa-2x"></i></button>
                        <div className={styles.imgbox}></div>
                        <div className={styles.buttonbox}>
                            <button className={styles.regist_button}>등록</button>
                            <button className={styles.modify_button}>수정</button>
                        </div>

                    </div>

                    <div className={styles.top_rightbox}>
                        <div className={styles.inputboxes}>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>구분</div>
                                <div className={styles.input_container}> <input className={styles.inputbox}></input></div>
                            </div>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>수강시작</div>
                                <div className={styles.input_container}> <input className={styles.inputbox}></input></div>
                            </div>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>과정명</div>
                                <div className={styles.input_container}> <input className={styles.inputbox}></input></div>
                            </div>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>수강종료</div>
                                <div className={styles.input_container}> <input className={styles.inputbox}></input></div>
                            </div>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>강사명</div>
                                <div className={styles.input_container}> <input className={styles.inputbox}></input></div>
                            </div>
                            <div className={styles.name_box}>
                                <div className={styles.inputboxname}>수강정원</div>
                                <div className={styles.input_container}> 
                                    <input 
                                        className={styles.inputbox} 
                                        value={/*inputValue*/ ""}                              // 상태값을 input의 value로 설정
                                        onChange={(e) => /*setInputValue(e.target.value)*/ ""} // 입력 가능하게 설정
                                    />
                                </div>
                            </div>                         
                        </div>
                        <div className={styles.contentbox}> <input className={styles.input_contentbox}></input> </div>
                    </div>
                  

                </div>

                <div className={styles.bottombox}>
                   
                </div>
        </div>
        </>
    )

}

export default Course_check;