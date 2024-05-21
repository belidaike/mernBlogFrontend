import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const Post = ({ post }) => {
    const distance = formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true });
    return (
        <div className="post mt-5">
            <Link className='img' to={`/post/${post._id}`}>
                <img className='post-img' src={`https://mernblogbackend-n5y9.onrender.com/${post.cover}`} alt="" />
            </Link>
            <div className="post-content">
                <Link className='img' to={`/post/${post._id}`}>
                    <h2 className='post-title'>{post.title}</h2>
                </Link>
                <span className="info">
                    <time>{distance}</time>
                    <br />
                    <span className="author">author: {post.author.username}</span>
                    <br />
                    <span>category: {post.category}</span>
                </span>
                <h4 className='summary m-0'>{post.summary}</h4>
                <div className='post-button-container'>
                    <Link className='post-button' to={`/post/${post._id}`}>Read More</Link>
                </div>
            </div>
        </div>
    );
};

export default Post;
