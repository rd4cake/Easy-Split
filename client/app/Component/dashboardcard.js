import React, { useState, useEffect } from 'react'
import styles from './dashboardcard.module.css'
import Image from 'next/image'
import { deleteContent } from '../API/api'
import { AiOutlineClose } from 'react-icons/ai'

function DashboardCard(props) {
    const Icon = { color: "white", fontSize: "1.5em", cursor: "pointer" }
    const [Mode, setMode] = useState("Owns you")

    useEffect(() => {
        if (props.type === "Recieve") {
            setMode("Give")
        }
    }, [])


    async function deleteCard() {
        const d = await deleteContent(props.id)
        props.remove(props.id)
    }


    return (
        <div className={styles.dashboardCard}>
            <div className={styles.dashboardCardProfile}>
                <Image
                    src={props.profile}
                    width={60}
                    height={60}
                    style={{ position: "relative", margin: "1em 1em", borderRadius: 30 }}
                    unoptimized={true}
                    priority
                />
                <h2>{props.name}</h2>
            </div>
            <div className={styles.dashboardCardQuantity}>
                <h2>{Mode} <span>${props.amount}</span></h2>
                <div onClick={deleteCard}>
                    <AiOutlineClose style={Icon} />
                </div>
            </div>
        </div>
    )
}

export default DashboardCard