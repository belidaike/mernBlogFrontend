import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

const Menu = ({ category, postId }) => {
    const { posts } = useContext(UserContext)
    const filteredPosts = posts.filter(post => post.category === category && post._id !== postId)


    return (
        <aside>
            <p className="m-0 pb-5">Other posts you may like...</p>
            {filteredPosts.map(post => (
                <div className='menu-container mb-3' key={post._id}>
                    <div className='menu gap-3 mb-5'>
                        <Link to={`/post/${post._id}`}>
                            <img className='menu-img' src={`https://mernblogbackend-n5y9.onrender.com/${post.cover}`} alt="" />
                        </Link>
                        <h4 className='m-0' style={{ fontFamily: 'Consolas' }}>{post.title}</h4>
                    </div>
                </div>
            ))}
        </aside>
    )
}

export default Menu
