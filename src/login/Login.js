import React, { useState } from 'react';

import styles from './Login.module.css';



const Login = () => {
    console.log("Login() invoked.");


    // 상태 관리: 입력값을 저장하는 상태 변수
    const [loginData, setLoginData] = useState({
        id: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState(' ');  // 에러 메시지를 저장할 상태 변수


    // 입력값 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 로그인 버튼 클릭 시 백엔드에 로그인 데이터 전송
    const handleLogin = async () => {
        const { id, password } = loginData;

        // 백엔드로 데이터 전송
        try {
            const response = await fetch('/project/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, password }) // JSON 형식으로 데이터 전송
            });

            const data = await response.json();     // 응답 데이터를 JSON 형식으로 파싱

            if (response.ok) {
                // 로그인 성공 시 처리
                console.log("로그인 성공");
                setErrorMessage('');                    // 성공 시 에러 메시지 초기화
            } else {
                // 로그인 실패 시 처리
                console.log("로그인 실패");
                setErrorMessage(data);                  // 실패 메시지 상태에 저장
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            setErrorMessage("서버와 연결할 수 없습니다."); // 네트워크 오류 시 에러 메시지 표시
        }
    };


    return (
        <div className={styles.login}>
                <div className={styles.logo}></div>
            <div className={styles.main}>

                <form>
                    <input
                        className={styles.id}
                        placeholder="id"
                        name="id"                           // 서버로 전송되는 이름
                        value={loginData.id}
                        onChange={handleInputChange}
                    />
                    <i className={`fas fa-user ${styles.user_icon}`} />
                    <input
                        className={styles.pw}
                        placeholder="password"
                        name="password"                     // 서버로 전송되는 이름
                        type="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                    />
                    <i className={`fas fa-lock ${styles.pass_icon}`} />

                    <div className={styles.errortext}>{errorMessage}</div>
                </form>

                    <button className={styles.loginbutton} onClick={handleLogin}>
                        로그인
                    </button>
            </div>
        </div>
    )
}

export default Login;