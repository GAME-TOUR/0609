import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/SignupForm.css';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password1 || !password2) {
            setError('모든 필드를 채워주세요.');
            return;
        }

        if (password1 !== password2) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('/users', { username, password1, password2 });
            console.log(response.data);
            alert('회원가입이 성공적으로 완료되었습니다.');

            // 메시지를 보여준 후, 메인 페이지로 리다이렉트
            setTimeout(() => {
                navigate('/');
            }, 2000);  // 2초 후에 이동

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('이미 등록된 사용자명입니다. 다른 이름을 사용해 주세요.');
            } else {
                setError(error.response ? error.response.data.message : '회원가입에 실패하였습니다.');
            }
        }
    };

    return (
        <div className="signup-form-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>회원가입</h2>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">등록</button>
            </form>
        </div>
    );
}

export default SignupForm;
