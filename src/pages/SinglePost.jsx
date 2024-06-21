import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'
import { UserContext } from '../UserContext'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Menu from './Menu'

const SinglePost = () => {
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState()
    const { userInfo } = useContext(UserContext)
    const nav = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`https://mernblogbackend-n5y9.onrender.com/post/${id}`)
                const response = await axios.get(`https://mernblogbackend-n5y9.onrender.com/post/${id}`)
                setPostInfo(response.data)
            } catch (error) {
                console.error('Error fetching post:', error)
            }
        }

        fetchData()
    }, [id])

    const deletePost = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this post?')
        if (confirmed) {
            nav('/')
            try {
                await axios.delete(`https://mernblogbackend-n5y9.onrender.com/post/${id}`, {
                    withCredentials: true,
                })
            } catch (error) {
                console.error('Error deleting post:', error)
            }
        }
    }

    return (
        <div className='singlepost-container mt-5'>
            {postInfo && (
                <>
                    <div className='singlepost'>
                        <div className="singlepost-container">
                            <img className='singlepost-img' src={`https://mernblogbackend-n5y9.onrender.com/${postInfo.cover}`} alt="" />
                            <h1 style={{ textAlign: 'center', fontFamily: 'Consolas' }}>{postInfo.title}</h1>
                            <time className='px-3 text-secondary'>{format(new Date(postInfo.createdAt), "MM/dd/yyyy")}</time>

                            <span className='d-flex align-items-center'>
                                <div className="author d-flex px-3">by {postInfo.author.username}</div>
                                {userInfo?.id === postInfo.author._id && (
                                    <>
                                        <Link className='pr-3 h-100 d-flex align-items-center' to={`/editpost/${postInfo._id}`}><FaEdit /></Link>
                                        <button className=' h-100 d-flex align-items-center' onClick={deletePost} style={{ border: 'none', background: 'none' }}>
                                            <MdDelete />
                                        </button>
                                    </>
                                )}
                            </span>
                            <div className='description mt-5 px-3' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                        </div>
                        <Menu category={postInfo.category} postId={postInfo._id} />
                    </div>
                </>
            )}
        </div>
    )
}

export default SinglePost
