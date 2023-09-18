
import React, { useState, useEffect, useMemo  } from 'react'
import { redirect } from 'next/navigation';
import styles from './login.module.css'
import Image from 'next/image'
import axios from 'axios';

function Login() {

    const [Register, setRegister] = useState(0)
    const [Valid, setValid] = useState(0)
    axios.defaults.withCredentials = true;


    function clicked() {
        if (Register == 0) {
            setRegister(1)
        }
        else {
            setRegister(0)
        }
    }

    useEffect(() => {
        if (Valid == 1) {
            redirect('/dashboard')
        }
    }, [Valid])


    function onSubmitRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");

        fetch('http://localhost:5050/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then(response => {
                if (response) {
                    setValid(1)
                }
            })
            .catch(error => console.error('Fetch error:', error));


        event.target.reset();
    }


    return (
        <div className={styles.login}>
            <div className={styles.loginContainer}>
                <div className={styles.loginFillLeft}>
                    <Image
                        src='/easysplittransparent.png'
                        width={250}
                        height={250}
                        style={{ position: "relative" }}
                        unoptimized={true}
                        priority
                    />
                    <div className={styles.loginInfoContainer}>
                        {Register == 0 ? <h1>Welcome Back</h1> : <h1>Create an Easy Split Account</h1>}
                        {Register == 0 ?
                            <form action="http://localhost:5050/auth/login" method="post">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username"></input>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password"></input>
                                <div className={styles.loginButtons}>
                                    <p>
                                        No account? <a onClick={clicked}>Signup</a>
                                    </p>
                                    <input className={styles.loginSubmitButton} type="submit" value="Login"></input>
                                </div>
                            </form>
                            :
                            <form onSubmit={onSubmitRegister}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username"></input>
                                <label htmlFor="password">Password</label>
                                <input type="text" id="password" name="password"></input>
                                <div className={styles.loginButtons}>
                                    <p>
                                        Have an account? <a onClick={clicked}>Login</a>
                                    </p>
                                    <input className={styles.loginSubmitButton} type="submit" value="Register"></input>
                                </div>
                            </form>}
                    </div>
                </div>
                <div className={styles.loginImageRight}>

                </div>
            </div>
        </div>
    )
}

export default Login

