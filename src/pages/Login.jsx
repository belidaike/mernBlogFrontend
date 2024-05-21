import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Logins from '../login.json'
import Lottie from 'lottie-react'
import logo from './logo.png'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setUserInfo, userInfo } = useContext(UserContext)
    const nav = useNavigate()
    const login = async e => {
        e.preventDefault()

        try {
            const response = await axios.post('https://mernblogbackend-n5y9.onrender.com/login', {
                username,
                password
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                const userInfo = response.data
                setUserInfo(userInfo)
                nav('/')
            } else {
                alert('Wrong credentials')
            }
        } catch (error) {
            alert('Error during login')
            console.error(error)
        }
    }
    useEffect(() => {
        if (userInfo) {
            nav('/')
        }
    })
    return (
        <div className='login'>
            <Lottie className='div' animationData={Logins} />
            <img src={logo} alt="" className='login-img' />
            <form className='login-form' onSubmit={login}>
                <h1 className='login-title'>Login</h1>
                <input className='login-inputs' type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='username' name="" id="" />
                <input className='login-inputs' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
                <button className='login-btn-inner'>Login</button>
                <span className='login-extra'>Already have an account? <Link to='/register' className='register-extra-2'>Register</Link></span>
            </form>
        </div>
    )
}

export default Login
