"use client"

import React, { useEffect, useState } from 'react'
import styles from './dashboard.module.css'
import Image from 'next/image'
import DashboardCard from '../Component/dashboardcard'
import DashboardAddGui from '../Component/dashboardaddgui'
import { link } from '../utils/constant'
import { getContent, getUsername, logout } from '../API/api'

import { CiLogout } from 'react-icons/ci'
import { IoAddSharp } from 'react-icons/io5'

function DashboardPage() {
    const Icon = { color: "white", fontSize: "1.5em" }
    const AddIcon = { color: "white", fontSize: "3em" }
    const [User, setUser] = useState('')
    const [Content, setContent] = useState([])
    const [Own, setOwn] = useState(0)
    const [Recieve, setRecieve] = useState(0)
    const [Gui, setGui] = useState(0)

    useEffect(() => {
        async function load() {
            const user = await getUsername()
            const content = await getContent(user)
            setUser(user)
            setContent(content)
            console.log(content)
            const sumOwn = Content.reduce((accumulator, currentObject) => {
                if (currentObject.type == "Own") {
                    return accumulator + parseInt(currentObject.amount);
                } else {
                    return accumulator;
                }
            }, 0);
            setOwn(sumOwn)
            console.log(sumOwn)

            const sumRecieve = Content.reduce((accumulator, currentObject) => {
                if (currentObject.type == "Recieve") {
                    return accumulator + parseInt(currentObject.amount);
                } else {
                    return accumulator;
                }
            }, 0);
            setRecieve(sumRecieve)
        }
        load()
    }, [])


    function GuiControl() {
        if (Gui == 1) {
            setGui(0)
        }
        else {
            setGui(1)
        }
    }

    function update(content) {
        setContent([content, ...Content])
    }

    const removeFromState = (id) => {
        const updatedItems = Content.filter(item => item._id !== id);
        setContent(updatedItems);
    };

    async function signout() {
        const d = await logout();
        window.location.href = link;
    }

    return (
        <div className={styles.dashboard}>
            {Gui == 1 ? <DashboardAddGui closeGui={GuiControl} update={update} /> : <div></div>}

            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardGUI}>

                    <div className={styles.dashboardLeft}>
                        <Image
                            src='/easysplitwhite.png'
                            width={200}
                            height={50}
                            style={{ position: "relative", margin: "1em 0em" }}
                            unoptimized={true}
                            priority
                        />
                        <h1 onClick={signout}> <CiLogout style={Icon} /> Sign Out</h1>
                    </div>

                    <div className={styles.dashboardRight}>
                        <div className={styles.dashboardProfile}>
                            <h1>Hello, {User}</h1>
                            <h2>You will recieve a total of <span>${Recieve}</span> and own <span>${Own}</span></h2>
                        </div>
                        <div className={styles.dashboardBtn}>
                            <IoAddSharp style={AddIcon} onClick={GuiControl} />
                        </div>
                        <div className={styles.dashboardCardContainer}>
                            {Content.map((item, index) => (
                                <DashboardCard key={index} name={item.name} profile={item.profile} type={item.type} amount={item.amount} id={item._id} remove={removeFromState} />
                            ))}
                            <div className={styles.dashboardCard}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardPage