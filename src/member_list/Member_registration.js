import React from 'react'
import styles from './Member_registration.module.css';

const Member_registration = ({ onClose }) => {
    const handleCancelClick = () => {
        onClose();
    }
    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    <h3>회원 등록</h3><div className={styles.form}>
                        <div className={styles.type}>
                            <input type="radio" id="student" name="type" value="student" />
                            <label for="student">훈련생</label>

                            <input type="radio" id="instructor" name="type" value="instructor" />
                            <label for="instructor">강사</label>

                            <input type="radio" id="admin" name="type" value="admin" />
                            <label for="admin">관리자</label>
                        </div>
                        <input type="text" className={styles.textbox} placeholder="아이디" />
                        <input type="password" className={styles.textbox} placeholder="비밀번호" />
                        <input type="text" className={styles.textbox} placeholder="이름" />
                        <input type="text" className={styles.textbox} placeholder="전화번호" />
                        <input type="text" className={styles.textbox} placeholder="신청과정" />
                        <div className={styles.photo}>
                            <input type="file" accept="image/*" />
                        </div>
                        <div className={styles.btns}>
                            <button type="submit" className={styles.submit}>등록</button>
                            <button type="button" className={styles.cancel} onClick={handleCancelClick} >취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Member_registration;