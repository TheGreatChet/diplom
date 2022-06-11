import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/useHttp';
import './ChatPage.scss'
import { Loader } from '../../common/Loader/Loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export const ChatPage = () => {
    const [chat, setChat] = useState({})
    const [msg, setMsg] = useState('')
    const defaultImg = require("../../../assets/images/User-avatar.png");
    const { request } = useHttp();
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);
    const [time, setTime] = useState(Date.now());

    const { state } = useLocation();
    const { param, title } = state;

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function getMessages() {
        await sleep(200);
        const messages = await request("/api/taskchat/".concat(param));
        if (messages != chat) setChat(messages);
        setLoading(false)
    }

    async function sendMessage() {
        await sleep(200);
        const send = await request("/api/taskchat/sendmessage", "POST", {
            text: msg,
            taskId: param,
            senderId: JSON.parse(localStorage.getItem("userData")).accountId
        });
        setMsg('')
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

    if (!loading) { 
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
                                        <h3 style={{ marginLeft: 5 }}>{mes.MessageText}</h3>
                                        <h5 className="message-date">{mes.SendDate.split('T')[1].replace(':00.000Z', '')}</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {auth.token && (
                        <div className="chat-content-row2">
                            <button className="chat-addphoto">
                                <FontAwesomeIcon style={{ width: 30, height: 30 }} icon={faPlus} />
                            </button>
                            <textarea className="chat-sendinput" onChange={(e) => setMsg(e.target.value)} value={msg} />
                            <button className="chat-sendbtn" onClick={sendMessage}>
                                <span className='chat-sendbtntext'>Отправить</span>
                                <FontAwesomeIcon className="chat-sendicon" style={{ width: 30, height: 30 }} icon={faCaretRight} />
                            </button>
                        </div>
                    )}
                    {!auth.token && (
                        <div className="chat-content-row2" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2>Отправка сообщений доступна для авторизированных пользователей</h2>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="chat-loading">
                <Loader />
            </div>
        )
    }
};
