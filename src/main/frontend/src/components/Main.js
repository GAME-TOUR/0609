import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBar from './NavBar'; // NavBar 컴포넌트 임포트

import './css/home.scss';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [textValue, setTextValue] = useState("");
    const [games, setGames] = useState([]); // 게임 목록을 저장할 상태
    const navigate = useNavigate();

    useEffect(() => {
        checkLoginStatus();
        fetchGames(); // 게임 데이터 불러오기
    }, []);

    const checkLoginStatus = () => {
        axios.get('/api/user', { withCredentials: true })
            .then(response => {
                if (response.data && response.data.name && response.data.name !== "anonymousUser") {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error('Failed to fetch user:', error);
                setIsLoggedIn(false);
            });
    };

    const fetchGames = () => {
        axios.get('http://localhost:8080/games') // 게임 데이터를 서버에서 불러오기
            .then(response => {
                setGames(response.data.content); // 응답에서 게임 데이터를 상태에 저장
            })
            .catch(error => {
                console.error('Failed to fetch games:', error);
            });
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/login';
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            alert('로그아웃 되었습니다.');
        } catch (error) {
            console.error('Logout failed:', error);
            alert('로그아웃 실패');
        }
    };

    const handleSetValue = (e) => {
        setTextValue(e.target.value);
    };

    const handleChange = (e) => {
        navigate(`search?q=${e.target.value}`, {
            state: {
                keyword: `${e.target.value}`
            },
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleChange(e);
    };

    const handleMain = () => navigate(`/`);

    return (
        <React.Fragment>
            <NavBar
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
                handleSignup={handleSignup}
                textValue={textValue}
                handleSetValue={handleSetValue}
                handleKeyDown={handleKeyDown}
            />
            <div className="home-header-banner">
                <div className='content-up'>
                    <div className="title1">최고의 게임 리뷰 사이트</div>
                    <div className="title2">게임투어에 오신 것을 환영합니다</div>
                </div>
            </div>
            <div className='content-down'>
                <div className='content-down-text'>지금 인기있는 게임</div>
                <div className="options">
                    {games.map(game => (
                        <div key={game.id} className='option-child' onClick={() => navigate(`/game/${game.id}`)}>
                            <img src={game.thumb} alt={game.title} className='image-child' />
                            <div className='text-child'>{game.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}
