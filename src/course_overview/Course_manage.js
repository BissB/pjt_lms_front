import { useState, useEffect, useRef , useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Course_manage.module.css';
import sample1 from './img/sample1.avif'
// import InfiniteScroll from 'react-infinite-scroll-component';       // 무한스크롤


const Course_manage = () => {

    const navigate = useNavigate();
    
    // //////////////////////////////////////////////////////   데이터 불러오기   /////////////////////////////////////////////////////////
    // const [searchParams] = useSearchParams();
    // const status = searchParams.get("status") || "default"; // 기본값 설정

    /// 무한 스크롤
    const [courses, setCourses] = useState([]); // 전체 데이터 리스트
    const [currPage, setCurrPage] = useState(0); // 현재 페이지 번호
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 추가 데이터 존재 여부

    const observer  = useRef();   // 스크롤 끝을 감지할 참조

    useEffect(() => {
        fetchCourses();
    }, []);


    const fetchCourses = useCallback(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)

        if (loading || !hasMore) return; // 로딩 중이거나 데이터 없으면 실행 X
        
        setLoading(true); // 로딩 시작

        const formData = new FormData();
            formData.append("currPage", currPage);
            formData.append("pageSize", 10);
            // formData.append("condition", "");  // 필요 시 추가
            // formData.append("q", "");          // 필요 시 추가

        fetch("https://localhost:443/course", {
            method: "POST", 
            body: formData, // FormData 전송 
        })
            .then((response) => {
                if (!response.ok) throw new Error("서버 응답 오류");
                return response.json();
            })
            .then((data) => {
                setCourses((prevCourses) => [...prevCourses, ...data.content]); // 기존 데이터에 추가
                setHasMore(data.content.length > 0); // 데이터가 없으면 더 이상 요청 X
                setCurrPage((prevPage) => prevPage + 1); // 페이지 증가
                console.log("data", data);
                console.log("content",data.content);
            })
            .catch((error) => console.error("데이터 불러오기 실패:", error))
            .finally(() => setLoading(false)); // 로딩 종료

    }, [currPage, loading, hasMore]);


    // 마지막 요소를 감지하는 Observer 설정
    const lastElementRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                fetchCourses(); // 마지막 요소가 보이면 다음 데이터 요청
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, fetchCourses]);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 검색기능
    const [selectedCategory, setSelectedCategory] = useState("")    // 구분 필터
    const [searchOption, setSearchOption] = useState("")
    const [search, setSearch] = useState("");
    const [filteredCourses, setFilteredCourses] = useState(courses); // 검색 결과 저장

    // 검색 기능 함수
    const handleSearch = () => {
        let results = courses;

        // 구분 필터
        if (selectedCategory) {
            results = results.filter((course) => course.category === selectedCategory);
        }

        if (searchOption && search) {
            results = results.filter((course) => course[searchOption]?.includes(search));
        }

        setFilteredCourses(results);
    };


    // 구분에 따른 색상 표기 선언
    const courseColor = (type) => {
        switch (type) {
            case 1:
                return { backgroundColor: '#94F285' };
            case 2:
                return { backgroundColor: '#72F2F2' };
            case 3:
                return { backgroundColor: '#F2DB94' };
            default:
                return { backgroundColor: '#d3d3d3' };
        };
    };

    // 엔터키 입력 시 검색 기능 작동 ======================================================

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {  // 엔터키가 눌렸을 때
            console.log('엔터키 눌림:', search);
            // 원하는 엔터키 동작을 여기에 추가
            // 예: 검색 요청 보내기
        }
    };

    const openCourseRegister = () => {
        navigate("/course_register");
    }


    const statusMapping = {
        1: "등록",
        2: "진행중",
        3: "폐지",
        4: "종료"
    };

    const typeMapping = {
        1: "NCS",
        2: "KDT",
        3: "산대특",
        4: "미정"
    };


    return (
        <div className={styles.topmain}>

            <div className={styles.main}>
                <div className={styles.headline}>과정 관리</div>

                {/* 과정 등록 버튼 */}

                <div className={styles.search}>
                        <button className={styles.register} onClick={openCourseRegister}>
                            과정 등록
                        </button>
                    <select className={styles.drop1} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">구분</option>
                        <option value="1">NCS</option>
                        <option value="2">KDT</option>
                        <option value="3">산대특</option>
                        <option value="4">미정</option>
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
                        onKeyDown={(e) => handleKeyDown(e)}  // 엔터키 처리
                    />

                    {/* 돋보기 */}
                    <button className={styles.icon} onClick={() => handleSearch()}>
                        <i className='fas fa-magnifying-glass' />
                    </button>

                </div>

                {/* 콘텐츠 박스 */}
                {courses.map((course, index) => (
                    <div className={styles.allContentsBox} key={course.id} ref={index === courses.length - 1 ? lastElementRef : null}>
                        <div className={styles.contentsBox} onClick={() => { navigate(`/course_detail/${course.courseId}`)}}>
                                                               
                            <div className={styles.category} style={courseColor(course.type)}>
                                {typeMapping[course.type] || "미정"}
                            </div>

                            <img src={sample1} className={styles.imgbox} alt="courseimg" />
                            <div className={styles.state}>{statusMapping[course.status] || "미정"}</div>

                            <div className={styles.contentsbody}>
                                <div className={styles.courseName}>
                                    {course.name}
                                </div>
                                <div className={styles.date}>
                                    {course.startDate} ~ {course.endDate}
                                </div>
                            </div>

                            <div className={styles.contentsfooter}>
                                <div className={styles.instructor}>
                                    {course.instructor}
                                </div>
                                <p>강사</p>
                                <div className={styles.capacity}>
                                    {course.capacity}
                                </div>  
                                <p>명</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* 로딩 상태 표시 */}
                {loading && <p style={{ textAlign: 'center', marginTop: '0' }}></p>}
                {!hasMore && <p style={{ textAlign: 'center' }}></p>}
            </div>


        </div>
    );
};

export default Course_manage;
