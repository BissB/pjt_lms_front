import { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Course_manage.module.css';
import sample1 from './img/sample1.avif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';       // 무한스크롤


const Course_manage = () => {
   
        const navigate = useNavigate();

        const [courses,setCourses] = useState([
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
                category: '풀스택',
                courseName: '완전 쉬운 풀스택 정복',
                state: '예정',
                startDate: "2025.1.1",
                endDate: "2025.1.31",
                img: sample1,
                instructor: "홍길동",
                capacity: "30/50",
        
            },            {
                category: '풀스택',
                courseName: '완전 쉬운 풀스택 정복',
                state: '예정',
                startDate: "2025.1.1",
                endDate: "2025.1.31",
                img: sample1,
                instructor: "홍길동",
                capacity: "30/50",
        
            },            {
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
                category: '풀스택',
                courseName: '완전 쉬운 풀스택 정복',
                state: '예정',
                startDate: "2025.1.1",
                endDate: "2025.1.31",
                img: sample1,
                instructor: "홍길동",
                capacity: "30/50",
        
            },            {
                category: '풀스택',
                courseName: '완전 쉬운 풀스택 정복',
                state: '예정',
                startDate: "2025.1.1",
                endDate: "2025.1.31",
                img: sample1,
                instructor: "홍길동",
                capacity: "30/50",
        
            }

        ]);

        // 검색기능
        const [selectedCategory, setSelectedCategory] = useState("")    // 구분 필터
        const [searchOption, setSearchOption] = useState("") 
        const [search, setSearch] = useState("");
        const [filteredCourses, setFilteredCourses] = useState(courses); // 검색 결과 저장
        
        // 무한 스크롤
        const [visibleCourses, setVisibleCourses] = useState(courses.slice(0,5));    // 화면에 표시할 과정들
        const [loading,setLoading] = useState(false);   // 로딩 상태
        const [hasMore, setHasMore] = useState(true);   // 더 불러올 데이터가 있는지에 대한 여부
        const observerRef = useRef(null);   // 스크롤 끝을 감지할 참조

        console.log(filteredCourses);
        
        // 검색 기능 함수
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


        // 구분에 따른 색상 표기 선언
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

        const loadMoreCourses = () => {
        if (loading || !hasMore) return;  // 이미 로딩 중이거나 데이터가 없으면 종료
    
        setLoading(true); // 데이터 로딩 시작
        
        setTimeout(() => {
            const nextIndex = visibleCourses.length; // 현재 보여지는 강좌의 개수
            const nextCourses = filteredCourses.slice(nextIndex, nextIndex + 5); // 더 가져올 강좌 5개
            
            if (nextCourses.length > 0) {
            setVisibleCourses((prev) => [...prev, ...nextCourses]); // 새로 가져온 강좌를 화면에 추가
            } else {
            setHasMore(false); // 데이터가 더 이상 없으면 hasMore를 false로 설정
            }
    
            setLoading(false); // 로딩 종료
        }, 1000); // 1초 뒤에 데이터 추가
        };
    
        useEffect(() => { // 컴포넌트 실행과 동시에 코드 실행
        if (loading || !hasMore) return; // 로딩 중이거나 데이터가 없으면 실행하지 않음
    
        const observer = new IntersectionObserver(
            (entries) => {
            entries.forEach((entry) => {
                // 스크롤이 끝에 가까워지면
                if (entry.isIntersecting && !loading && hasMore) {
                loadMoreCourses(); // 더 많은 콘텐츠 로드
                }
            });
            },
            {
            root: document.querySelector('#main'), // 메인 컨테이너를 root로 설정
            rootMargin: "0px 0px 200px 0px", // 아래쪽으로 감지 범위 확장 (스크롤 내리면 콘텐츠가 보일 때)
            threshold: 1.0, // 10%만 보여도 실행
            }
        );
    
        // observerRef.current가 화면에 보일 때만 observer 작동
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
    
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current); // 컴포넌트 언마운트 시 observer 해제
        };
        }, [hasMore, loading]); // hasMore와 loading 상태가 변경될 때마다 실행
    
        // 엔터키 입력 시 검색 기능 작동 ======================================================
        const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // 검색 처리 함수 호출
        }
        };
    
    


        // //////////////////////////////////////////////////////   데이터 불러오기   /////////////////////////////////////////////////////////
        // const [searchParams] = useSearchParams();
        // const status = searchParams.get("status") || "default"; // 기본값 설정

        // useEffect(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
        //     // if (!status) return; // status 값이 없으면 실행 안 함

        //     fetch(`http://localhost:443/course/list/${status}`)
        //         .then((response) => {
        //             if (!response.ok) {
        //                 throw new Error("서버 응답 오류");
        //             }
        //             return response.json();
        //         })
        //         .then((data) => {
        //             setFormData({
        //                 category: data?.category || "",
        //                 startDate: data?.startDate || "",
        //                 courseName: data?.courseName || "",
        //                 endDate: data?.endDate || "",
        //                 instructor: data?.instructor || "",
        //                 capacity: data?.capacity || "",
        //                 content: data.content || "",
        //             });
        //         })
        //         .catch((error) => {
        //             console.error("데이터 불러오기 실패:", error);
        //         });
        //         // fetchData();    // *** db에서 데이터 받아오기 ***굼금! 
        // }, [status]);

        // ///////////////////////////////////////////////////////    해당 id 과정 상세조회/////////////////////////////////////////////////////////////////////


        // const navigate = useNavigate();

        // const handleCourseClick = (crsCode) => {
        //     navigate(`/course_overview/${crsCode}`); // 클릭한 과정의 crsCode를 URL로 전달
        // };
        // return (
        //     <div>
        //         {courses.map((course) => (
        //             <div key={course.id} onClick={() => handleCourseClick(course.id)}>
        //                 {course.name}
        //             </div>
        //         ))}
        //     </div>
        // );

        // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        const openCourseRegister = () =>{

            navigate("/course_register");
        }

        return (
            <div className={styles.topmain}>
            
                <div className={styles.main}>
                    <div className={styles.headline}>과정 관리</div>
                    
                    {/* 과정 등록 버튼 */}
                    <button className={styles.register} onClick={openCourseRegister}>
                        과정 등록
                    </button>
                    
                    {/* 검색 기능 */}

                    
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

                        {/* 돋보기 */}
                        <button className={styles.icon} onClick={() => handleSearch()}>
                            <i className='fas fa-magnifying-glass' />
                        </button>

                        
                        
                    </div>
                    
                    {/* 콘텐츠 박스 */}
                    {visibleCourses.map((course, index) => (
                        <div className={styles.allContents} key={index}>
                            <div style={courseColor(course.category)}>
                                {course.category}
                            </div>
                            
                            <img src={sample1} className={styles.imgbox} alt="courseimg"/>
                            <div className={styles.state}>{course.state}</div>
        
                            <div className={styles.contentsbody}>
                                <div className={styles.courseName}>
                                    {course.courseName}
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
                            ))}
                        {/* 스크롤 확인용 div */}
                        <div ref={observerRef} style={{ height: '3px', background: 'transparent' }} />

                        {/* 로딩 상태 표시 */}
                        {loading && <p style={{ textAlign: 'center', marginTop: '0' }}></p>}
                        {!hasMore && <p style={{ textAlign: 'center' }}></p>}
                </div>

        
            </div>
        );
};    

export default Course_manage;
