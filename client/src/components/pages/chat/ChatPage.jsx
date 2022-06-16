import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/useHttp';
import './ChatPage.scss'
import { Loader } from '../../common/Loader/Loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { MyButton } from '../../common/MyButton/MyButton'

export const ChatPage = () => {
    const [chat, setChat] = useState({})
    const [msg, setMsg] = useState('')
    const defaultImg = require("../../../assets/images/User-avatar.png");
    const { request } = useHttp();
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const [time, setTime] = useState(Date.now());
    const [photo, setPhoto] = useState('')
    const inputFile = useRef(null)
    const navigate = useNavigate()

    const { state } = useLocation();
    const { param, title, statusId } = state;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function getMessages() {
        await sleep(50);
        const messages = await request("/api/taskchat/".concat(param));
        if (messages != chat) setChat(messages);
        setLoading(false)
    }

    async function sendMessage() {
        await sleep(200);
        if (!msg) {
            toast.error('Заполните поле сообщения')
            return;
        }
        const send = await request("/api/taskchat/sendmessage", "POST", {
            text: msg,
            taskId: param,
            senderId: JSON.parse(localStorage.getItem("userData")).accountId,
            image: photo
        });
        setMsg('')
        setPhoto(null)
        await getMessages()
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
            getMessages();
        }, 5000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    const getImage = (e) => {
        let file = e.target.files[0];

        let firstReader = new FileReader();
        let secondReader = new FileReader();

        firstReader.readAsText(file);
        secondReader.readAsDataURL(file);

        secondReader.onload = function () {
            setPhoto(secondReader.result.split(',')[1])
        };

        secondReader.onerror = function () {
            toast.error(secondReader.error);
        };
    };


    if (!loading && chat.length) {
        return (
            <div className="chat-container">
                <div className="chat-header">
                    <p>{"Вопрос: " + title}</p>
                </div>
                <div className="chat-content">
                    <div className="chat-content-row1">
                        {Array.from(chat).map((mes) => {
                            return (
                                <div className="message">
                                    <div className="message-sender">
                                        <img className="message-sender-image" src={`data:image/png;base64,${mes.ProfileImage}`} onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = defaultImg;
                                        }} />
                                        <div className="message-sender-name">
                                            <h6>{mes.Login}</h6>
                                            <h6>{mes.Name}</h6>
                                        </div>
                                    </div>
                                    <div className="message-text">
                                        <div>
                                            <h3 style={{ marginLeft: 5 }}>{mes.MessageText}</h3>
                                            {mes.MessageImage && (
                                                <img className='chat-messageimage' src={`data:image/png;base64,${mes.MessageImage}`} />
                                            )}
                                        </div>
                                        <h5 className="message-date">{mes.SendDate.split('T')[0].split('-')[2] + '.' + mes.SendDate.split('T')[0].split('-')[1] + ' '}{mes.SendDate.split('T')[1].replace(':00.000Z', '')}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {(auth.token && statusId != 4) && (
                    <div className="chat-content-row2">
                        <input className="chat-getphoto" ref={inputFile} type="file" accept=".jpeg, .png, .jpg" onChange={getImage} style={{ display: 'none' }}></input>
                        <button className="chat-addphoto" onClick={() => { inputFile.current.click() }}>
                            <FontAwesomeIcon style={{ width: 30, height: 30 }} icon={faPlus} />
                        </button>
                            <textarea className="chat-sendinput" onChange={(e) => setMsg(e.target.value)} value={msg} />
                            {photo && (
                            <div className='chat-inputimage-wrap'>
                                <img className='chat-inputimage' src={`data:image/png;base64,${photo}`} onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImg;
                                }} />
                            </div>
                            )}
                        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                            <button className="chat-sendbtn" onClick={sendMessage}>
                                <span className='chat-sendbtntext'>Отправить</span>
                                <FontAwesomeIcon className="chat-sendicon" style={{ width: 30, height: 30 }} icon={faCaretRight} />
                            </button>
                            {JSON.parse(localStorage.getItem("userData")).roleId == '2' && (<MyButton style={{width: 120, height: 45}}>Закрыть заявку</MyButton>)}
                        </div>
                    </div>
                )}
                {!auth.token && (
                    <div className="chat-content-row2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h2>Отправка сообщений доступна для авторизированных пользователей</h2>
                    </div>
                )}
                {auth.token && statusId == 4 && (
                    <div className="chat-content-row2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h2>Вопрос закрыт, отправка запрещена</h2>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className="chat-container">
                <div className="chat-header">
                    <p className='chat-headet-txt'>{"Вопрос: " + title}</p>
                </div>
                <div className="chat-content">
                    <div className="chat-content-row1">
                        <div className="chat-loading">
                            {
                                loading
                                ?
                                <Loader />
                                :
                                <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                                    <h1 className='chat-empty'>В этом чате отсутвуют сообщения</h1>
                                    <MyButton style={{ alignSelf: 'center', width: 150, height: 50 }} onClick={() => { navigate('/') }}>
                                        <h2 style={{ padding: 0, margin: 0 }}>Назад</h2>
                                    </MyButton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {(auth.token && statusId != 4) && (
                    <div className="chat-content-row2">
                        <input className="chat-getphoto" ref={inputFile} type="file" accept=".jpeg, .png, .jpg" onChange={getImage} style={{ display: 'none' }}></input>
                        <button className="chat-addphoto" onClick={() => { inputFile.current.click() }}>
                            <FontAwesomeIcon style={{ width: 30, height: 30 }} icon={faPlus} />
                        </button>
                        <textarea className="chat-sendinput" onChange={(e) => setMsg(e.target.value)} value={msg} />
                        <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                            <button className="chat-sendbtn" onClick={sendMessage}>
                                <span className='chat-sendbtntext'>Отправить</span>
                                <FontAwesomeIcon className="chat-sendicon" style={{ width: 30, height: 30 }} icon={faCaretRight} />
                            </button>
                            {JSON.parse(localStorage.getItem("userData")).roleId == '2' && (<MyButton style={{width: 120, height: 45}}>Закрыть заявку</MyButton>)}
                        </div>
                        {photo && (
                            <div className='chat-inputimage-wrap'>
                                <img className='chat-inputimage' src={`data:image/png;base64,${photo}`} onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImg;
                                }} />
                            </div>
                        )}
                    </div>
                )}
                {!auth.token && (
                    <div className="chat-content-row2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h2>Отправка сообщений доступна для авторизированных пользователей</h2>
                    </div>
                )}
                {auth.token && statusId == 4 && (
                    <div className="chat-content-row2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <h2>Вопрос закрыт, отправка запрещена</h2>
                    </div>
                )}
            </div>
        )
    }
};
