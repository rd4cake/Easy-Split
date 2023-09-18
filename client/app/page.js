"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Login from './login.js';
import LoginController from './loginController';

export default function Home() {
  
  return (
    <div>
      <LoginController/>
    </div>
  )
}
