import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext'; // AuthContext import
import srchicon from './test_image/srchicon.svg';
import './css/NavBar.css';
import axios from "axios";

const NavBar = ({ textValue, handleSetValue, handleKeyDown }) => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            navigate('/');  // 로그아웃 후 메인 페이지로 리디렉션
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/login';
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleMain = () => {
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className='navbar-container'>
                <div className='navbar-content'>
                    <div className='left-content' onClick={handleMain}>
                        <div className='header-logo'></div>
                        <a className='game-tour-text'>GAME TOUR</a>
                    </div>
                    <div className='right-content'>
                        <div className='srch'>
                            <img src={srchicon} width='20px' alt='Search Icon'></img>
                            <input
                                type="text"
                                placeholder='검색어를 입력해주세요'
                                value={textValue}
                                onChange={handleSetValue}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        {isLoggedIn ? (
                            <button onClick={handleLogout}>로그아웃</button>
                        ) : (
                            <div className="auth-buttons">
                                <button onClick={handleLogin}>로그인</button>
                                <button onClick={handleSignup}>회원가입</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
