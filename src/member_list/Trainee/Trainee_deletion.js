import React from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import styles from './Trainee_deletion.module.css';

const Trainee_deletion = () => {
  const navigate = useNavigate();
  const { traineeId } = useParams();
  
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://localhost:443/trainee/${traineeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        alert('훈련생 삭제가 완료되었습니다.');
        navigate(-1);
      } else {
        console.error('삭제 실패:', response.statusText);
        alert('훈련생 삭제에 실패했습니다.');
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
            <button className={styles.delete_submit} onClick={handleDeleteClick}>삭제</button>
            <button type="button" className={styles.delete_cancel} onClick={()=> navigate(-1)}>취소</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trainee_deletion;
