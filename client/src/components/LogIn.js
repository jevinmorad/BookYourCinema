import React from 'react';
import styles from '../styles/LogIn.module.scss';

export default function LoginForm() {
    return (
        <div className={styles.body}>
            <form className={styles.login}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="text" placeholder="Mobile no" />
                <button className={styles.loginBtn}>Login</button>
            </form>
        </div>
    );
}
