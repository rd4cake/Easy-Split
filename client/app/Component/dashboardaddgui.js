"use client"
import React, { useState } from 'react'
import styles from './dashboardaddgui.module.css'
import Image from 'next/image'
import axios from 'axios';
import { postContent } from '../API/api';
import {AiOutlineClose} from 'react-icons/ai'

function DashboardAddGui(props) {
    const [File, setFile] = useState(null)
    const [Name, setName] = useState('');
    const [Amount, setAmount] = useState('');
    const [MType, setMType] = useState('Own');
    const Icon = { color: "white", fontSize: "1.5em", cursor: "pointer" }

    function name_change(e) {
        setName(e.target.value);
    }

    function amount_change(e) {
        setAmount(e.target.value);
    }

    function type_change(e) {
        setMType(e.target.value);
    }


    function file_changed() {
        var selectedFile = document.getElementById('file-input').files[0];
        setFile(selectedFile);
        var img = document.getElementById('dashboardaddgui_profile_img')

        var reader = new FileReader();
        reader.onload = function () {
            img.src = this.result
        }
        reader.readAsDataURL(selectedFile);
    }

    async function handleSubmit(event){
        event.preventDefault();

        const apiUrl = 'http://localhost:5050/img'; // Replace with your API endpoint

        const formData = new FormData();
        formData.append('image', File);
        formData.append('name', Name);
        formData.append('amount', Amount);
        formData.append('type', MType);

        const result = await postContent(formData);  
        props.update(result);
        props.closeGui();
    };

    return (
        <div className={styles.dashboardAddGui} id="dashboardAddGui">
            <div className={styles.dashboardAddGuiCenter}>
                <div className={styles.dashboardClose} onClick={props.closeGui}>
                    <AiOutlineClose style={Icon}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.dashboardguiImgSelector}>
                        <Image
                            id='dashboardaddgui_profile_img'
                            src='/missing.png'
                            width={100}
                            height={100}
                            style={{ position: "relative", margin: "1em 1em 1em 0em" }}
                            unoptimized={true}
                            priority
                        />
                        <div>
                            <h2>Profile Picture</h2>
                            <input type="file" accept="image/*" id="file-input" name="image" onChange={file_changed} required></input>
                        </div>
                    </div>

                    <hr />
                    <div className={styles.dashboardFieldContainer}>
                        <h2>Name</h2>
                        <input type="text" name="name" onChange={name_change} required></input>
                    </div>


                    <div className={styles.dashboardFieldContainer}>
                        <h2>Amount Own/Recieve</h2>
                        <input type="number" name="amount" onChange={amount_change} required></input>
                        <select id="dashboardgui-option" name="option" onChange={type_change}>
                            <option value="Own">Own</option>
                            <option value="Recieve">Recieve</option>
                        </select>
                    </div>

                    <input type="submit" name="submit" className={styles.dashboardBtn}></input>

                </form>
            </div>
        </div>
    )
}

export default DashboardAddGui