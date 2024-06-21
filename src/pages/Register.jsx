import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from '../UserContext'
import axios from 'axios'
import registers from '../register.json'
import Lottie from 'lottie-react'
import logo from './logo.png'
const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { userInfo } = useContext(UserContext)
    const nav = useNavigate()


    const register = async e => {
        e.preventDefault()

        try {

            // const response = await axios.post('https://mernblogbackend-n5y9.onrender.com/register', {
            const response = await axios.post('https://mernblogbackend-n5y9.onrender.com/api/auth/register', {
                username,
                password,
                email
            })

            if (response.status === 200) {
                alert('Registration successful')
                nav('/login')
            } else {
                alert('Registration failed')
            }
        } catch (error) {
            alert('Error during registration')
            console.error(error)
        }
    }
    useEffect(() => {
        if (userInfo) {
            nav('/')
        }
    })

    return (
        <div className='register'>
            <Lottie className='div' animationData={registers} />
            <img src={logo} alt="" className='register-img' />
            <form className='register-form' onSubmit={register}>
                <h1 className='register-title'>Register</h1>
                <input className='register-inputs' type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='username' />
                <input className='register-inputs' type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' />
                <input className='register-inputs' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
                <button className='register-btn-inner'>Register</button>
                <span className='register-extra'>Already have an account? <Link className='register-extra-2' to='/login'>Login</Link></span>
            </form>

        </div>
    )
}

export default Register
