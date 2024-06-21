import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../UserContext'
import logo from '../logo.png'
import { IoIosSearch } from "react-icons/io"

const Header = () => {
    const { userInfo, setUserInfo, handleChange } = useContext(UserContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo) {
                    // const response = await axios.get('https://mernblogbackend-n5y9.onrender.com/api/auth/profile', { withCredentials: true })
                    const response = await axios.get('https://mernblogbackend-n5y9.onrender.com/api/auth/profile', { withCredentials: true })
                    setUserInfo(response.data)
                }
                return
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log('User not authenticated')
                } else {
                    console.error('Error fetching user profile:', error)
                }
            }
        }

        fetchData()
    }, [setUserInfo, userInfo])

    const logout = async () => {
        try {
            await axios.post('https://mernblogbackend-n5y9.onrender.com/api/auth/logout', {}, { withCredentials: true })
            setUserInfo(null)
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    const username = userInfo?.username

    return (
        <header className='d-flex justify-content-between align-items-center py-3'>
            <div className='d-flex'>
                <Link to='/' className='d-flex align-items-center mt-2'>
                    <img src={logo} width={32} alt="Logo" />
                </Link>
                <Link className='rtblog' style={{ textDecoration: 'none' }} to='/'>
                    <h1 className='m-0 kani'>rtBlog</h1>
                </Link>
            </div>
            <div className='search-container d-flex align-items-center'>
                <input type="text" className='search' placeholder='Search' onChange={handleChange} />
                <IoIosSearch className='search-icon' size={30} />
            </div>
            <nav className="navbar navbar-expand-lg gap-3">
                <div className="container-fluid d-flex justify-content-end">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-center" id="navbarNav">
                        <ul className="navbar-nav">
                            {username ? (
                                <span className="nav-item">
                                    <Link className='text-decoration-none' to='#' onClick={logout}>Logout</Link>
                                </span>
                            ) : (
                                <li className="nav-item nav-2 d-flex gap-3">
                                    <Link className='text-decoration-none' to='/login'>Login</Link>
                                    <Link className='text-decoration-none' to='/register'>Register</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
