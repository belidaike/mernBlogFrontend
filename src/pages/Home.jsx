import React, { useContext } from 'react'
import Post from './Post'
import Hero from './Hero'
import { UserContext } from '../UserContext'

const Home = () => {
    const { filteredPosts } = useContext(UserContext)

    if (!filteredPosts.length) {
        return <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '20px' }}><h1>No Post Found.</h1></div>
    }

    return (
        <>
            <div className="post-container pb-5">
                {filteredPosts.length > 0
                    ? filteredPosts.map(post => (
                        <>
                            <Hero />
                            <Post key={post._id} post={post} />
                        </>
                    ))
                    : <>
                        <Hero />
                        <p>No posts available</p>
                    </>}
            </div>
        </>
    )
}

export default Home
