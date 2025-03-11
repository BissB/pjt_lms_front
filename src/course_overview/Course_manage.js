import { useState,useEffect } from 'react';
import Course_info from '../course_details/Course_info';
import styles from './Course_manage.module.css';
import sample1 from './img/sample1.avif'

const Course_manage = () => {
    const courses = [
        {
            category: '풀스택',
            courseName: '완전 쉬운 풀스택 정복',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
        },
        {
            category: '프론트엔드',
            courseName: '가뿐한 프론트앤드 부수기',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
        },

        {
            category: '풀스택',
            courseName: '완전 쉬운 풀스택 정복',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        },


        {
            category: '세무회계',
            courseName: '전산 회계 1급',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        },


        {
            category: '프론트엔드',
            courseName: '가뿐한 프론트앤드 부수기',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        },

        {
            category: '풀스택',
            courseName: '완전 쉬운 풀스택 정복',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        },

        {
            category: '백엔드',
            courseName: '내 손으로 백앤드 부수기',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        },

        {
            category: '풀스택',
            courseName: '완전 쉬운 풀스택 정복',
            state: '예정',
            startDate: "2025.1.1",
            endDate: "2025.1.31",
            img: sample1,
            instructor: "홍길동",
            capacity: "30/50",
    
        }
    ];

    // 검색
    const [selectedCategory, setSelectedCategory] = useState(""); // 구분 필터
    const [searchOption, setSearchOption] = useState("");
    const [search, setSearch] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(courses); // 검색 결과 저장

    console.log(filteredCourses);
    
    const handleSearch = () => {
        let results = 
        courses;

        // 구분 필터
        if (selectedCategory) {
            results = results.filter((course) => course.category === selectedCategory);
        }

        if (searchOption && search) {
            results = results.filter((course) => course[searchOption]?.includes(search));
        }

        setFilteredCourses(results);
    };

    // 구분에 따른 색상 변경
    const courseColor = (category) => {
        switch (category) {
            case '풀스택':
                return { backgroundColor: '#ff6347' };
            case '프론트엔드':
                return { backgroundColor: '#81F7F3' };
            case '백엔드':
              return { backgroundColor: '#32cd32' };
            case '세무회계':
              return { backgroundColor: '#ffa500' };
            default:
              return { backgroundColor: '#d3d3d3' }; 
      };
    };

    useEffect(() => {
    }, [selectedCategory, searchOption, search]);

    // 엔터키 입력 시 검색 기능 작동
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 팝업
    const [formData, setFormData] = useState({
        category: "",
        startDate: "",
        courseName: "",
        endDate: "",
        instructor: "",
        capacity: "",
        content: ""
    });

    const [courseRegister, setCourseRegister] = useState(false);

    const openCourseRegister = () => { setCourseRegister(true); };
    const closeCourseRegister = () => { setCourseRegister(false); };

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div className={styles.main}>
            <div className={styles.headline}>과정 관리</div>

            <div className={styles.search}>
                <select className={styles.drop1} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">구분</option>
                    <option value="풀스택">풀스택</option>
                    <option value="프론트엔드">프론트엔드</option>
                    <option value="백엔드">백엔드</option>
                </select>
                <select className={styles.drop2} onChange={(e) => setSearchOption(e.target.value)}>
                    <option value="">항목</option>
                    <option value="courseName">과정명</option>
                    <option value="instructor">강사명</option>
                </select>

                <input
                    type="text"
                    className={styles.search_bar}
                    placeholder="검색어를 입력하세요."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleKeyPress}  // 엔터키 처리
                />
            </div>

            {/* 콘텐츠 박스 */}
           
            {filteredCourses.map((course, index) => (
           
                    <div className={styles.allContents}>
                        <div key={index} className={styles.contentsboxlist}>
                                    <div className={styles.contentsbox}>
                                                <div style={courseColor(course.category)}>
                                                    {course.category}
                                                    </div>                                    
                                            <img src={sample1} className={styles.imgbox} alt="courseimg"/>
                                            <div className={styles.state}>{course.state}</div>

                                            <div className={styles.contentstextbody}>
                                                <div className={styles.courseName}>{course.courseName}</div>
                                                <div className={styles.date}>{course.startDate} ~ {course.endDate}</div>
                                            </div>
                                        
                                            <div className={styles.contentstextfooter}>
                                                <div className={styles.instructorname}>
                                                    {course.instructor}
                                                </div>
                                                    <p className={styles.instructor}>강사</p>
                                                <div className={styles.capacity}>{course.capacity}</div> 
                                            </div>
                                    </div>
                            </div>
                    </div>
            ))}


            {/* 과정 등록 팝업 */}
            <button className={styles.register} onClick={openCourseRegister}>과정 등록</button>
            
            <div className={styles.courseRegisterPop}>
{courseRegister && (
    <div className={styles.topbox}>
        <div className={styles.top_leftbox}>
            <button className={styles.backbutton}><i className="fa-solid fa-chevron-left fa-2x" onClick={closeCourseRegister}></i></button>
            <div className={styles.imgbox2}></div>
            <div className={styles.buttonbox}>
                <button className={styles.regist_button}>등록</button>
                <button className={styles.modify_button}>OO</button>
            </div>
        </div>

        <div className={styles.top_rightbox}>
            <div className={styles.inputboxes}>
                <Course_info label="구분" value={formData.category} onChange={(e) => handleChange("category")(e)} />
                <Course_info label="수강시작" value={formData.startDate} onChange={(e) => handleChange("startDate")(e)} />
                <Course_info label="과정명" value={formData.courseName} onChange={(e) => handleChange("courseName")(e)} />
                <Course_info label="수강종료" value={formData.endDate} onChange={(e) => handleChange("endDate")(e)} />
                <Course_info label="강사명" value={formData.instructor} onChange={(e) => handleChange("instructor")(e)} />
                <Course_info label="수강정원" value={formData.capacity} onChange={(e) => handleChange("capacity")(e)} />
            </div>
        </div>
    </div> 
    )}
    </div>
        </div>

    );
};

export default Course_manage;
