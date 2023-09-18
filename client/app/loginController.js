"use client"
import React, { useState, useEffect } from 'react'
import Login from './login'
import axios from 'axios'
import { redirect } from 'next/navigation';


function LoginController() {


    const [Valid, setValid] = useState(0)
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.post('http://localhost:5050/auth/authenticated')
            .then((response) => {
                if (response.data) {
                    setValid(1);
                }
                else {
                    setValid(2);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    function mode() {
        if (Valid == 0) {
            return <div></div>
        }
        else if (Valid == 1){
            redirect('/dashboard')
        }
        else {
            return <Login/>
        }
    }
    return (
        <div>
            {mode()}
        </div>
    )
}

export default LoginController