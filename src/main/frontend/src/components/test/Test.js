import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './test.css'

function Test() {

  const [msg, setMsg] = useState('')

  useEffect(() => {
   fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/hello");
      setMsg(response.data);
    } catch (error) {
      console.error('데이터 불러오기 에러:', error);
    }
  }

  return (
      <div className='connect'>
        리액트 스프링 부트 연동 테스트<br></br><br></br>

        백엔드 통신 성공? : {msg} <br></br><br></br>
      </div>
  );
}

export default Test;