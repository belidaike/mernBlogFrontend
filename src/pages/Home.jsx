import React, { useContext, useEffect } from 'react'
import Post from './Post'
import Hero from './Hero'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate()
    const { filteredPosts, loading } = useContext(UserContext)

    useEffect(() => {
        if (filteredPosts) {
            nav('/')
        }
    }, [filteredPosts, nav])


    if (loading) {
        return <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '20px' }}><h1>Loading...</h1></div>
    }
    if (!filteredPosts.length === 0) {
        return <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '20px' }}><h1>No Post Found.</h1></div>
    }


    return (
        <>
            <Hero />
            <div className="post-container pb-5">
                {filteredPosts.length > 0
                    ? filteredPosts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                    : <p>No posts available</p>}
            </div>
        </>
    )
}

export default Home
