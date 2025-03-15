import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';

const Login = () => {
    console.log("Login() invoked.");

    const navigate = useNavigate();

    // 상태 관리: 입력값을 저장하는 상태 변수
    const [loginData, setLoginData] = useState({
        userId : '',
        passwd: ''
    });

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

        // 백엔드로 데이터 전송
        try {
            // const formData = new FormData();
            // formData.append("userId", loginData.userId);
            // formData.append("passwd", loginData.passwd);

            const response = await fetch('https://localhost:443/security/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: loginData
            });

            const text = await response.text();
            console.log("서버 응답:", text);

            if (response.ok) {
                // 로그인 성공 시 처리
                console.log("로그인 성공");
                navigate("/course_overview");

            } else {
                // 로그인 실패 시 처리
                console.log("로그인 실패");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
        }
    };


    return (
        <div className={styles.login}>
                <div className={styles.logo}></div>
            <div className={styles.main}>

                <form>
                    <input
                        className={styles.id}
                        placeholder="userId"
                        name="userId"                           // 서버로 전송되는 이름
                        value={loginData.userId}
                        onChange={handleInputChange}
                    />
                    <i className={`fas fa-user ${styles.user_icon}`} />
                    <input
                        className={styles.pw}
                        placeholder="password"
                        name="passwd"                     // 서버로 전송되는 이름
                        type="password"
                        value={loginData.passwd}
                        onChange={handleInputChange}
                    />
                    <i className={`fas fa-lock ${styles.pass_icon}`} />

                </form>

                    <button className={styles.loginbutton} onClick={handleLogin}>
                        로그인
                    </button>
            </div>
        </div>
    )
}

export default Login;