import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Instructor_modification.module.css';

const Instructor_modification = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams();

  const [courses, setCourses] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    tel: '',
    course: '',
    status: '',
    enabled: '',
    upfiles: null,
    existingFileName: '', // 기존 파일 이름 저장
  });

  // 기존 강사 정보 가져오기
  useEffect(() => {
    const fetchInstructorData = async () => {


      try {
        const response = await fetch(`https://localhost:443/instructor/${instructorId}`);

        if (response.ok) {
          const data = await response.json();
          setRegisterForm({
            name: data.name,
            tel: data.tel,
            course: data.course ? data.course.courseId : '', // course가 없으면 빈 문자열로 초기화
            status: data.status,
            enabled: data.enabled,
            upfiles: null, // 새 파일 업로드를 위해 초기화
            existingFileName: data.upfiles || '', // 기존 파일 이름 설정
          });
          console.log('강사 정보:', data);
        } else {
          console.error('강사 정보 불러오기 실패:', response.statusText);
        }
      } catch (error) {
        console.error('요청 중 오류 발생:', error);
      }
    };

    fetchInstructorData();
  }, [instructorId]);


  // 과정 정보 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      const params = new URLSearchParams({
        instructorId: instructorId,
      });

      try {
        const response = await fetch(`https://localhost:443/course/selectCourseIns?${params.toString()}`,
          {
            method: 'GET',
          });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
          console.log('과정 정보:', data);
          console.log('params: ', params);
        } else {
          console.error('Failed to fetch courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // 디버깅 로그 추가
  useEffect(() => {
    console.log('강사 정보:', registerForm);
    console.log('과정 정보:', courses);
    console.log('업로드 파일:', registerForm.upfiles);
  }, []);

  // 입력값 변경 핸들러
  const handleChange = (field, value) => {
    setRegisterForm((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // 파일 변경 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRegisterForm((prevForm) => ({
      ...prevForm,
      upfiles: file,
      existingFileName: file ? file.name : prevForm.existingFileName, // 새 파일 이름으로 업데이트
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', registerForm.name);
      formData.append('tel', registerForm.tel);
      formData.append('courseId', registerForm.course);
      formData.append('status', registerForm.status);
      formData.append('enabled', registerForm.enabled);

      if (registerForm.upfiles) {
        formData.append('upfiles', registerForm.upfiles); // 새 파일 추가
      }

      const response = await fetch(`https://localhost:443/instructor/${instructorId}`, {
        method: 'POST', // 수정 요청은 PUT 메서드 사용
        body: formData,
      });

      if (response.ok) {
        alert('강사 정보가 성공적으로 수정되었습니다.');
        navigate('/instructor_list'); // 이전 페이지로 이동
      } else {
        console.error('수정 실패:', response.statusText);
        alert('강사 정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 취소 버튼 핸들러
  const handleCancelClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 상태 옵션 정의
  const statusOption = {
    "1": "등록",
    "2": "강의중",
    "3": "퇴사",
  };

  return (
    <div className={styles.main}>
      <div className={styles.background} />
      <div className={styles.container}>
        <h2>강사정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <input
              type="text"
              className={styles.textbox}
              placeholder="이름"
              name="name"
              value={registerForm.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              required
            />

            <input
              type="tel"
              className={styles.textbox}
              placeholder="전화번호(-제외)"
              name="tel"
              value={registerForm.tel}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              maxLength={11}
              required
            />

            <select
              name="course"
              className={styles.textbox}
              value={registerForm.course || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.name}
                </option>
              ))}
            </select>

            <select
              name="status"
              className={styles.textbox}
              value={registerForm.status || ''}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <option value="">상태를 선택하세요</option>
              {Object.entries(statusOption).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>

            <div className={styles.photo}>
              {registerForm.existingFileName && (
                <p>기존 파일 이름: {registerForm.existingFileName}</p>
              )}
              <input type="file" name="upfiles" onChange={handleFileChange} />
            </div>

            <div className={styles.btns}>
              <button type="submit" className={styles.submit}>수정</button>
              <button type="button" className={styles.cancel} onClick={handleCancelClick}>취소</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Instructor_modification;
