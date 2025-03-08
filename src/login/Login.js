import styles from './Login.module.css';


const Login = () => {
    console.log("Login() invoked.");
    return (
        <div className={styles.login}>   
            <div className={styles.login_text}></div>
            <div className={styles.login_id}></div>
            <div className={styles.login_pw}></div>
            <div className={styles.login_button}></div>
        </div>
  )
}

export default Login;