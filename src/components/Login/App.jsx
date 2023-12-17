import axios from 'axios';
import './App.css';

import { useNavigate } from 'react-router-dom';
import myApi from '../../myApi';
import { useState } from 'react';

function App() {
    const navigateTo = useNavigate();  // Move this line to the beginning of the component

    let [myemail, setmyemail] = useState('');
    let [txterr, settxterr] = useState('');
    let [myPassword, setmyPassword] = useState('');

    async function loginfoo() {
        try {
            var res = await axios.post(`${myApi}login-student`, { studentname: myemail, id: myPassword })
            const restwo = await res.data;

            if (restwo) {
                localStorage.setItem('logintoken', JSON.stringify(restwo));
                navigateTo('/');
            } else {
                settxterr("Invalid error or Password");
                setTimeout(() => {
                    settxterr("");
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            settxterr("Invalid error or Password");
            setTimeout(() => {
                settxterr("");
            }, 4000);
        }
    }

    return (
        <div className='loginpage'>
            <div className="logincard">
                <div className='signUpOrSignInDiv'>
                    <button className='acitvebtn'>
                        <span><i className="fa-solid fa-user"></i></span>
                        <span>Sign In Student</span>
                    </button>
                </div>
                <div className='inputDivlogin UserNameInputDiv'>
                    <i className="fa-regular fa-envelope"></i>
                    <input placeholder='Email' value={myemail} onChange={(e) => setmyemail(e.target.value)} type="text" />
                </div>
                <div className='inputDivlogin PassworInputDiv'>
                    <i className="fa-solid fa-keyboard"></i>
                    <input placeholder='Id...' value={myPassword} onChange={(e) => setmyPassword(e.target.value)} type="password" />
                </div>
                <div>
                    <span style={{ color: '#6f11f5', cursor: 'pointer', textDecoration: 'underline' }}>Forget Id?</span>
                </div>
                <div className='my-3'>
                    <input className="form-check-input me-1 ms-3" type="checkbox" value="" id="flexCheckDefault" />
                    <span>Remember Me</span>
                </div>
                <div style={{ color: 'red' }}>
                    {txterr}
                </div>
                <div className='loginBtn mt-2' onClick={() => loginfoo()}>
                    <button><i className="fa-solid fa-right-to-bracket me-1"></i> Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default App;
