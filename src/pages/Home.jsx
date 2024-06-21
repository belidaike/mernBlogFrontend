import React, { useContext, useEffect } from 'react'
import Post from './Post'
import Hero from './Hero'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate()
    const { filteredPosts, loading } = useContext(UserContext)

    useEffect(() => {
        if (!loading || filteredPosts) {
            nav('/')
        }
    }, [filteredPosts, nav, loading])

    if (loading) {
        return <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '20px' }}><h1>Loading...</h1></div>
    }


    return (
        <>
            <Hero />
            <div className="post-container pb-5">
                {filteredPosts.length > 0
                    ? filteredPosts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                    : <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '20px' }}><h1>No posts available</h1></div>}
            </div>
        </>
    )
}

export default Home
