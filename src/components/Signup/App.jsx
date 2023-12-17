import { useNavigate } from 'react-router-dom';
import './App.css';

import myApi from '../../myApi.js'

import axios from 'axios'
import { useState } from 'react';

function App() {
    const navigateTo = useNavigate();

    let [username, setusername] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [repeatpassword, setrepeatpassword] = useState('')
    let [errTxt, setErrTxt] = useState('')
    let [succesTxt, setsuccesTxt] = useState('')


    async function signupFuctionality() {
        if (username === '' || repeatpassword === '' || password === '' || email === '') {
            setErrTxt("Please fill up all fields*")
            setTimeout(() => {
                setTimeout(() => {
                    setErrTxt('')
                })
            }, 4000)
        } else {
            try {
                const response = await axios.post(`${myApi}sign-up`, { username, password, email });
                const responseData = await response.data;
                setsuccesTxt("A email verification is just send to " + email + " and it will expiress in 1 hour")
                setTimeout(() => {
                        setsuccesTxt('')
                }, 4000)
            } catch (error) {
                // console.log(error.response.status);
                if(error?.response?.status === 401){
                    setErrTxt("Ye email pehle se hi le li gai hai ap please kisi aur email se sign up karen");
                } else{
                    setErrTxt("Server is not responsing at a time please try again or check the code!");
                }
                setTimeout(() => {
                    setErrTxt('');
                }, 2000);
            }
        }
    }

    return (
        <div className='signuppage'>
            <div className="signupcard">
                <div className='signUpOrSignInDiv'>
                    <button onClick={() => navigateTo('/login')}>
                        <span><i className="fa-solid fa-user"></i></span>
                        <span>Sign In</span>
                    </button>
                    <button className='acitvebtn'>
                        <span><i className="fa-solid fa-user-plus"></i></span>
                        <span>Sign Up</span>
                    </button>
                </div>
                <div className='inputDivSignup emailInputDiv'>
                    <i className="fa-regular fa-envelope"></i>
                    <input placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} type="email" />
                </div>
                <div className='inputDivSignup UserNameInputDiv'>
                    <i className="fa-regular fa-circle-user"></i>
                    <input placeholder='Username' value={username} onChange={(e) => setusername(e.target.value)} type="text" />
                </div>
                <div className='inputDivSignup PassworInputDiv'>
                    <i className="fa-solid fa-keyboard"></i>
                    <input placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} type="password" />
                </div>
                <div className='inputDivSignup ConfirmInputDiv'>
                    <i className="fa-regular fa-square-check"></i>
                    <input placeholder='Confirm Password' value={repeatpassword} onChange={(e) => setrepeatpassword(e.target.value)} type="password" />
                </div>
                <div style={{ color: 'red' }}>
                    {errTxt}
                </div>
                <div style={{ color: 'green' }}>
                    {succesTxt}
                </div>
                <div className='AccepteTermsDiv ps-5 my-3'>
                    Accept <span style={{ color: '#6f11f5', cursor: 'pointer', textDecoration: 'underline' }}>Terms & Conditions</span>
                </div>
                <div className='SignUpBtn mt-2' onClick={signupFuctionality}>
                    <button><i className="fa-solid fa-user-plus me-1"></i> Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default App;