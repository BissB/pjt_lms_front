import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import styles from './Course_check.module.css';
import { Course_delete, Course_content, Course_info } from '.';

const Course_check = () => {
    console.log("Course_check() invoked.");

    const navigate = useNavigate();
    // 과정 조회 데이터 ///////////////////////////////////////////////////////////////////////////////////////
    const { courseId } = useParams(); // 과정 코드 받아오기

    const [formData, setFormData] = useState({
        type: "",
        name: "",
        startDate: "",
        endDate: "",
        capacity: "",
        currCount: "",
        detail: "",
        instructor: "",
        upfilePath: "",
        upfileUuid: "",
        upfileExtension:"",
    });
    const [trainees, setTrainees] = useState([]);
    const [status, setStatus] = useState("");

    // 전화번호 포맷팅 함수
    function formatPhoneNumber(tel) {
        const telStr = tel.toString();
        return `${telStr.slice(0, 3)}-${telStr.slice(3, 7)}-${telStr.slice(7, 11)}`;
    }
    useEffect(() => {
        console.log("업데이트된 formData:", formData);
    }, [formData]);  //  formData 변경될 때마다 로그 확인

    useEffect(() => {                               // 백엔드에서 데이터 가져오기 (오류 방지 처리 추가)
        console.log("courseId:", courseId);
        fetch(`https://localhost:443/course/${courseId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("서버 응답 오류");
                }
                return response.json();
            })
            .then((data) => {
                console.log("curr", data.currCount);
                console.log("status", data.status);
                setFormData({
                    type: data?.type || "",
                    name: data?.name || "",
                    startDate: data?.startDate || "",
                    endDate: data?.endDate || "",
                    currCount: data?.currCount || "0",
                    capacity: data?.capacity || "",
                    detail: data?.detail || "",
                    instructor: data.instructor?.name || "지정된 강사 없음",
                    upfilePath: data.upfile[0]?.path || "",
                    upfileUuid: data.upfile[0]?.uuid || "",
                    upfileExtension: data.upfile[0]?.extension || "",
                });
                setStatus(data?.status || "");

                const formattedTrainees = data.trainees.map((member) => ({
                    ...member,
                    tel: formatPhoneNumber(member.tel),
                }));
                
                setTrainees(formattedTrainees);

                console.log("data", data);
                console.log("status", data.status);
            })
            .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
            });
        // fetchData();    // *** db에서 데이터 받아오기 ***굼금! 
    }, []);

    //// 수정 팝업////////////////////////////////////////////////////////////////////////////////////////////////

    const handleModifyShowPopup = () => {
        navigate(`/course/update/${courseId}`);
    };


    //// 삭제 팝업////////////////////////////////////////////////////////////////////////////////////////////////

    const [showDeletePopup, setShowDeletePopup] = useState(false);  // 팝업 상태


    // 삭제 버튼 클릭 시 팝업 표시
    const handleDeleteShowPopup = () => {
        setShowDeletePopup(true);
    };

    // 팝업 닫기
    const handleDeleteClosePopup = () => {
        setShowDeletePopup(false);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const typeMapping = {
        1: "NCS",
        2: "KDT",
        3: "산대특",
        4: "미정"
    };

    const statusMap = {
        "1": "훈련중",
        "2": "중도탈락",
        "3": "중도포기",
        "4": "취업완료",
      };

    return (

        <div className={styles.main}>

            {showDeletePopup && <Course_delete onClose={handleDeleteClosePopup} />}

            <div className={styles.topbox}>

                <div className={styles.top_leftbox}>

                    <button className={styles.backbutton} onClick={() => navigate(`/course_overview/${status}`)}><i class="fa-solid fa-chevron-left fa-1.8x"></i></button> {/* 뒤로가기 버튼 */}
                    {/* <div className={styles.imgbox} > <img src={`/courseFile/39241600-2977-4137-bd11-3fd968422601.png`}></img></div> */}
                    <div className={styles.imgbox} > <img src={`${formData.upfilePath}${formData.upfileUuid}${formData.upfileExtension}`}></img></div>
                    <div className={styles.buttonbox}>
                        <button className={styles.modify_button} onClick={handleModifyShowPopup}>수정</button>
                        <button className={styles.delete_button} onClick={handleDeleteShowPopup}>삭제</button>
                    </div>

                </div>

                <div className={styles.top_rightbox}>
                    <div className={styles.inputboxes}>
                        <Course_info label="구분" value={typeMapping[formData.type] || "미정"} disabled />
                        <Course_info label="수강시작일" value={formData.startDate} disabled />
                        <Course_info label="과정명" value={formData.name} disabled />
                        <Course_info label="수강종료일" value={formData.endDate} disabled />
                        <Course_info label="강사명" value={formData.instructor} disabled />
                        <Course_info label={`수강 정원(현재 인원: ${formData.currCount}명)`} value={formData.capacity} disabled />
                    </div>
                    <Course_content label="내용" value={formData.detail} disabled />
                </div>


            </div>

            <div className={styles.bottombox}>
                <div className={styles.listbox}>
                    <div className={styles.tableHeader}>
                        <div>고유번호</div>
                        <div>이름</div>
                        <div>전화번호</div>
                        <div>등록일</div>
                        <div>상태</div>
                    </div>
                    <table className={styles.tableBody}>
                        <tbody>
                            {trainees.map((member) => (
                                <tr key={member.traineeId} className={styles.tr}>
                                    <td>{member.traineeId}</td>
                                    <td>{member.name}</td>
                                    <td>{member.tel}</td>
                                    <td>{member.crtDate}</td>
                                    <td>{statusMap[member.status]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}


export default Course_check;