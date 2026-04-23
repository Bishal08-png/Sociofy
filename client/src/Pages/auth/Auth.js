import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';


const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);

    const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpass: "" });
    const [errorMessage, setErrorMessage] = useState('');

    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setErrorMessage('');
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const handlSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const authData = { ...data, email: data.email.trim().toLowerCase() };

        if (isSignUp) {
            if (data.password === data.confirmpass) {
                try {
                    await dispatch(signUp(authData));
                } catch (err) {
                    setErrorMessage(err.response?.data?.message || err.response?.data || "Signup failed. Please try again.");
                }
            } else {
                setConfirmPass(false);
            }
        } else {
            try {
                await dispatch(logIn(authData));
            } catch (err) {
                setErrorMessage(err.response?.data?.message || err.response?.data || "Invalid email or password.");
            }
        }
    }



    const restForm = () => {
        setConfirmPass(true);
        setErrorMessage('');

        setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpass: ""
        })
    }



    return (

        //    Left Side
        <div className='Auth'>
            <div className="a-left">
                <div className="auth-brand">
                    <img src={Logo} alt="Sociofy Logo" className="auth-brand-logo" />
                    <span className="auth-brand-name">Sociofy</span>
                </div>
                <div className="Webname">
                    <h2>Welcome!</h2>
                    <h5>My MERN social space to connect, share, and chat.</h5>
                </div>
            </div>


            {/* Right Side */}

            <div className="a-right">
                <form className='infoForm authForm' onSubmit={handlSubmit}>

                    <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

                    {isSignUp &&
                        <div>
                            <input type="text" placeholder='First Name'
                                className='infoInput' name='firstname'
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input type="text" placeholder='Last Name'
                                className='infoInput' name='lastname'
                                onChange={handleChange}
                                value={data.lastname}
                            />
                        </div>
                    }

                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            className='infoInput' name='email'
                            onChange={handleChange}
                            value={data.email}
                            autoComplete='email'
                            autoCapitalize='none'
                            autoCorrect='off'
                            inputMode='email'
                        />
                    </div>

                    <div>
                        <input type="password" placeholder='Password'
                            className='infoInput' name='password'
                            onChange={handleChange}
                            value={data.password}
                            autoComplete={isSignUp ? 'new-password' : 'current-password'}
                        />
                        {isSignUp &&
                            <input type="password" placeholder='Confirm Password'
                                className='infoInput' name='confirmpass'
                                onChange={handleChange}
                                value={data.confirmpass}
                                autoComplete='new-password'
                            />
                        }
                    </div>


                    <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
                        * Confirm Password is not same
                    </span>

                    {errorMessage && (
                        <span style={{ color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }}>
                            {typeof errorMessage === 'string' ? errorMessage : "Authentication failed."}
                        </span>
                    )}


                    <div>
                        <span style={{ fontSize: "12px", cursor: "pointer" }}
                            onClick={() => { setIsSignUp((prev) => !prev); restForm() }}
                        >
                            {isSignUp ? "Already have an account? Login here" : "Don't have an account? SignUp here"}
                        </span>
                    </div>

                    <button className='button infoButton' type='submit' disabled={loading}>
                        {loading ? "loading..." : isSignUp ? "Sign Up" : "Login"}
                    </button>

                </form>
            </div>
        </div>
    )
}



export default Auth
