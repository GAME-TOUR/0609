import React, { Component, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";

import './css/home.scss';
import srchicon from './test_image/srchicon.svg';

export default function SubHeader() {

    const handleMain = () => window.location.href = 'http://localhost:3000';
    const handlelogin = () => window.location.href = 'http://localhost:8080/login';
      
    // 검색어 변수 및 onChange 함수 선언 
    const [textValue, setTextValue] = useState("");
    const handleSetValue = (e) => {
      setTextValue(e.target.value);
    };  
    
    const navigate = useNavigate();
    const setSearchValue = useState("");
    
    const handleChange = (e) => {
      // setSearchValue(e.target.value);
      console.log(e.target.value);
      // navigate(`search?q=${e.target.value}`);
      
    };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleChange(e);
    };

    return (
        <React.Fragment>
            <div className='home-header-container'>
              <div className='home-header-content'>
                  <div className='left-content' onClick={handleMain}>
                      
                      <div className='header-logo'></div>
                      <a className='game-tour-text'>GAME TOUR</a>
                      
                  </div>
            
                  <div className='right-content'>
                      <div className='srch'>
                        <img src={srchicon} width='20px'></img>
                        <textarea
                            placeholder='검색어를 입력해주세요'
                            value={textValue}
                            onChange={(e) => handleSetValue(e)}
                            onKeyDown={handleKeyDown}/>                       
                      </div>
                      {/*<button onClick={handlelogin}>로그인</button>*/}
                      {/*<button onClick={handlelogin}>회원가입</button>*/}
                  </div>
              </div>
            </div>
        </React.Fragment>
    );
}

