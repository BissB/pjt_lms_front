import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Course_register from './Course_register';
import styles from './Course_manage.module.css';
import sample1 from './img/sample1.avif';

const Course_manage = () => {
    const navigate = useNavigate();
    const { status } = useParams();

    // 검색 상태 관리
    const [listData, setListData] = useState({
        type: "",
        searchWord: "",
        searchText: "",
    });

    const handleChange = (field, value) => {
        setListData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // 무한 스크롤 상태 관리
    const [courses, setCourses] = useState([]);
    const [currPage, setCurrPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    // 데이터 가져오기 함수
    const fetchCourses = useCallback(async (page = currPage, reset = false) => {
        if (loading || (!reset && !hasMore)) return;

        setLoading(true);
        const params = new URLSearchParams({
            currPage: page,
            pageSize: 10,
        });

        const formData = new FormData();
        formData.append("type", listData.type);
        if (listData.searchWord) {
            formData.append("searchWord", listData.searchWord);
            formData.append("searchText", listData.searchText);
        }

        try {
            const response = await fetch(`https://localhost:443/course/list/${status}?${params.toString()}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("서버 응답 오류");
            const data = await response.json();
            const coursesWithInstructor = data.content.map(course => ({
                ...course,
                instructor: course.instructor || {}, // instructor가 없으면 빈 객체로 설정
                upfilePath: course.upfile[0]?.path || "",
                upfileName: course.upfile[0]?.original || "",
            }));
            setCourses((prevCourses) => (reset ? coursesWithInstructor : [...prevCourses, ...coursesWithInstructor]));
            // setCourses((prevCourses) => (reset ? data.content : [...prevCourses, ...data.content]));
            const totalPages = data.totalElements ? Math.ceil(data.totalElements / 10) : Infinity;
            setHasMore(data.content.length > 0 && page < totalPages - 1);
            setCurrPage(page + 1);
            console.log("Fetched data:", data);
        } catch (error) {
            console.error("데이터 불러오기 실패:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [status, listData, loading, hasMore]); // currPage 제거

    // 초기 로드
    useEffect(() => {
        setCourses([]);
        setCurrPage(0);
        setHasMore(true);
        setListData({ type: "", searchWord: "", searchText: "", })
        handleChange("type", "");
        handleChange("searchWord", "");
        handleChange("searchText", "");

        fetchCourses(0, true); // 초기 데이터 로드
    }, [status]); // status만 의존성으로 설정

    // IntersectionObserver 설정
    const lastElementRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    console.log("Fetching more data at page:", currPage);
                    fetchCourses(currPage);
                }
            }, { threshold: 0.7 });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, currPage, fetchCourses] // 의존성 명확화
    );

    // 검색 함수
    const handleSearch = () => {
        setCourses([]);
        setCurrPage(0);
        setHasMore(true);
        fetchCourses(0, true); // 검색 시 초기화 후 로드
    };

    // 엔터키로 검색
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    // 모달 상태
    const [isOpen, setIsOpen] = useState(false);
    const openCourseRegister = () => setIsOpen(true);
    const closeCourseRegister = () => setIsOpen(false);

    // 상태 및 타입 매핑
    const statusMapping = { 1: "진행예정", 2: "진행중", 3: "폐지", 4: "종료" };
    const typeMapping = { 1: "NCS", 2: "KDT", 3: "산대특", 4: "미정" };
    const courseColor = (type) => {
        switch (type) {
            case 1: return { backgroundColor: '#94F285' };
            case 2: return { backgroundColor: '#72F2F2' };
            case 3: return { backgroundColor: '#F2DB94' };
            default: return { backgroundColor: '#d3d3d3' };
        }
    };

    return (
        <div className={styles.topmain}>
            <div className={styles.main}>
                {isOpen && <Course_register closeModal={closeCourseRegister} />}
                <div className={styles.headline}>과정 관리</div>

                <div className={styles.search}>
                    <button className={styles.register} onClick={openCourseRegister}>
                        과정 등록
                    </button>
                </div>
                <div className={styles.rightBtn}>
                    <select
                        className={styles.drop1}
                        name="type"
                        value={listData.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        <option value="">구분</option>
                        <option value="1">NCS</option>
                        <option value="2">KDT</option>
                        <option value="3">산대특</option>
                        <option value="4">미정</option>
                    </select>
                    <select
                        className={styles.drop2}
                        name="searchWord"
                        value={listData.searchWord}
                        onChange={(e) => handleChange("searchWord", e.target.value)}
                    >
                        <option value="">항목</option>
                        <option value="name">과정명</option>
                        <option value="instructorName">강사명</option>
                    </select>
                    <input
                        type="text"
                        name="searchText"
                        className={styles.search_bar}
                        placeholder="검색어를 입력하세요."
                        value={listData.searchText}
                        onChange={(e) => handleChange("searchText", e.target.value)}
                        onKeyUp={handleKeyPress}
                    />
                    <button className={styles.icon} onClick={handleSearch}>
                        <i className="fas fa-magnifying-glass" />
                    </button>
                </div>

                {courses.length === 0 && !loading && !hasMore ? (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>데이터가 없습니다.</p>
                ) : (
                    courses.map((course, index) => (
                        <div
                            className={styles.allContentsBox}
                            key={course.id}
                            ref={index === courses.length - 1 ? lastElementRef : null}
                        >
                            <div
                                className={styles.contentsBox}
                                onClick={() => navigate(`/course_detail/${course.courseId}`)}
                            >
                                <div className={styles.category} style={courseColor(course.type)}>
                                    {typeMapping[course.type] || "미정"}
                                </div>
                                <img src={`${course.upfilePath}${course.upfileName}`} className={styles.imgbox} alt="courseimg" />
                                <div className={styles.state}>{statusMapping[course.status] || "미정"}</div>
                                <div className={styles.contentsbody}>
                                    <div className={styles.courseName}>{course.name}</div>
                                    <div className={styles.date}>
                                        {course.startDate} ~ {course.endDate}
                                    </div>
                                </div>
                                <div className={styles.contentsfooter}>
                                    <div className={styles.instructor}>{course.instructor.name}</div>
                                    <p>강사</p>
                                    <div className={styles.capacity}>{course.currCount} / {course.capacity}</div>
                                    <p>명</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Loading...</p>}
                {!hasMore && courses.length > 0 && (
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>모든 데이터를 불러왔습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Course_manage;