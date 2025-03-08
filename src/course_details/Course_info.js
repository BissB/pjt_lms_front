import styles from './Course_info.module.css';

const Course_info = ({label,value, onChange}) => {
    console.log("Course_info() invoked.");

    return(
        <div className={styles.name_box}>
            <div className={styles.inputboxname}>{label}</div>
            <div className={styles.input_container}> 
                <input 
                    className={styles.inputbox} 
                    value={value}                             
                    onChange={onChange}                
                />
            </div>
        </div>
    )

}

export default Course_info;