import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Trainee_deletion.module.css';
import { Link } from 'react-router-dom';

const Trainee_deletion = ({ traineeId, onClose, updateMembers }) => {
  const navigate = useNavigate();
  
  const handleDeleteClick = () => {
    navigate('/trainee_list');
  }

  const handleDeleteTrainee = async () => {
    try {
      const response = await fetch('https://localhost:443/trainee/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: traineeId }), // 훈련생 ID 전송
      });

      if (response.ok) {
        const data = await response.json();
        console.log('삭제 성공:', data);
        alert('회원 삭제가 완료되었습니다.');
        updateMembers(traineeId); // 삭제 후 목록 갱신
      } else {
        console.error('등록 실패:', response.statusText);
        alert('회원 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className={styles.delete_background}>
        <div className={styles.delete_container}>
          <h2>이 훈련생을 리스트에서 삭제하시겠습니까?</h2>
          <div className={styles.delete_btns}>
            <button onClick={handleDeleteTrainee} className={styles.delete_submit}>삭제</button>
            <button type="button" className={styles.delete_cancel} onClick={handleDeleteClick}>취소</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainee_deletion;
