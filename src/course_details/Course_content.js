import styles from './Course_content.module.css';

const Course_content = ({value, onChange}) => {
    console.log("Course_content() invoked.");

    return(
        <div className={styles.contentbox}>
            <textarea className={styles.input_contentbox} value={value}  onChange={onChange} />           {/* textarea로 변경 , input은 줄바꿈 x*/}
        </div>
    )

}

export default Course_content;