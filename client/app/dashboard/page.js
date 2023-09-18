"use client"

import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import DashboardPage from './dashboard'
import { checkAuth } from '../API/api'
import { link } from '../utils/constant'

function Dashboard() {
  const Icon = { color: "white", fontSize: "1.5em" }
  const AddIcon = { color: "white", fontSize: "3em" }
  const [Mode, setMode] = useState(0)

  useEffect(() => {
    async function auth() {
      const b = await checkAuth()
      if (b) {
        setMode(1)
      } 
      else{
        window.location.href = link;
      }

    }
    auth()
  }, [])


  return (
    <div className={styles.dashboard}>
       {Mode == 1 ? <DashboardPage/> : <div></div>}
    </div>
  )
}

export default Dashboard