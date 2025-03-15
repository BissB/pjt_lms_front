import { useState, useEffect, useRef , useCallback} from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import Course_register from './Course_register';
import styles from './Course_manage.module.css';
import sample1 from './img/sample1.avif'
// import InfiniteScroll from 'react-infinite-scroll-component';       // 무한스크롤


const Course_manage = () => {

    const navigate = useNavigate();
    const {status} = useParams(); // 과정 코드 받아오기
    // //////////////////////////////////////////////////////   데이터 불러오기   /////////////////////////////////////////////////////////
    // const [searchParams] = useSearchParams();
    // const status = searchParams.get("status") || "default"; // 기본값 설정

    const [ listData, setListData] = useState({
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
    

    /// 무한 스크롤
    const [courses, setCourses] = useState([]); // 전체 데이터 리스트
    const [currPage, setCurrPage] = useState(0); // 현재 페이지 번호
    const [loading, setLoading] = useState(false); // 데이터 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 추가 데이터 존재 여부

    const observer  = useRef();   // 스크롤 끝을 감지할 참조

    useEffect(() => {
        fetchCourses();
        setCourses([]);  // 기존 데이터 초기화
        setCurrPage(0);   // 페이지 번호 초기화
        setHasMore(true); // 추가 데이터 요청 가능 상태로 변경
        setListData({
            type: "",
            searchWord: "",
            searchText: "",
        });
    }, [status]);


    const fetchCourses = useCallback(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
        
        // if (loading || !hasMore) return; // 로딩 중이거나 데이터 없으면 실행 X
        
        setLoading(true); // 로딩 시작

        const params = new URLSearchParams({
            currPage: currPage,      // 현재 페이지 번호
            pageSize: 10,            // 한 페이지 당 개수
        });

        const formData = new FormData();
            formData.append("type", listData.type);
            if (listData.searchWord) {
                formData.append("searchWord", listData.searchWord);
                formData.append("searchText", listData.searchText);
            }

        fetch(`https://localhost:443/course/list/${status}?${params.toString()}`, {
            method: "POST", 
            body: formData
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


    const handleSearch = () => {

        // if (loading || !hasMore) return; // 로딩 중이거나 데이터 없으면 실행 X
        console.log("listData", listData);
        setLoading(true); // 로딩 시작

        setCourses([]);   // 기존 데이터 삭제
        setCurrPage(0);   // 페이지 번호 초기화
        setHasMore(true); // 추가 데이터 여부 리셋

        const params = new URLSearchParams({
            currPage: 0,      // 현재 페이지 번호
            pageSize: 10,            // 한 페이지 당 개수
        });

        const formData = new FormData();
            formData.append("type", listData.type);
            if (listData.searchWord) {
                formData.append("searchWord", listData.searchWord);
                formData.append("searchText", listData.searchText);
            }

        fetch(`https://localhost:443/course/list/${status}?${params.toString()}`, {
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

    };

    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    const [isOpen, setIsOpen] = useState(false);

    const openCourseRegister = () => {
        setIsOpen(true);
    };

    const closeCourseRegister = () => {
        setIsOpen(false);
    };


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
                {isOpen && (
                        <Course_register closeModal={closeCourseRegister} />
                )}

                <div className={styles.headline}>과정 관리</div>

                {/* 과정 등록 버튼 */}

                <div className={styles.search}>
                        <button className={styles.register} onClick={openCourseRegister}>
                            과정 등록
                        </button>
                    <select className={styles.drop1} name="type" onChange={(e) => handleChange("type", e.target.value)}>
                        <option value="">구분</option>
                        <option value="1">NCS</option>
                        <option value="2">KDT</option>
                        <option value="3">산대특</option>
                        <option value="4">미정</option>
                    </select>
                    <select className={styles.drop2} name="searchWord" onChange={(e) => handleChange("searchWord", e.target.value)}>
                        <option value="">항목</option>
                        <option value="name">과정명</option>
                        <option value="instructorName">강사명</option>
                    </select>

                    <input
                        type="text"
                        name='searchText'
                        className={styles.search_bar}
                        placeholder="검색어를 입력하세요."
                        value={listData.searchText}
                        onChange={(e) => handleChange("searchText", e.target.value)}
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
