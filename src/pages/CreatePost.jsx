import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../UserContext"

const CreatePost = () => {
    const nav = useNavigate()
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        if (!userInfo) {
            nav('/login')
        }
    }, [userInfo, nav])

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('art')
    const [files, setFiles] = useState('')

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquite'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link']
        ]
    }

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link'
    ]

    const createNewPost = async (e) => {
        e.preventDefault()

        if (content.length < 50) {
            alert("Content must be at least 50 characters long!")
            return
        }

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('category', category)
        data.set('file', files[0])

        const response = await fetch('https://mernblogbackend-n5y9.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        })

        if (response.ok) {
            nav('/')
        }
    }

    return (
        <div className="createpost-container">
            <form onSubmit={createNewPost} className="createpost-form">
                <span className="createpost d-flex flex-column gap-2 bg-white p-3 rounded-3">
                    <input className="createpost-input" required type="title" placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)} />
                    <label htmlFor="category">Choose a Category:</label>
                    <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="art">Art</option>
                        <option value="science">Science</option>
                        <option value="adventure">Adventure</option>
                        <option value="food">Food</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="music">Music</option>
                        <option value="sci-si">Sci-Fi</option>
                        <option value="fashion">Fashion</option>
                    </select>
                    <input className="createpost-input" required type="summary" placeholder={'Summary'} value={summary} onChange={e => setSummary(e.target.value)} />
                    <input required type="file" onChange={e => setFiles(e.target.files)} />
                    <div className="quill-container">
                        <ReactQuill required value={content} onChange={setContent} modules={modules} formats={formats} />
                    </div>
                    <span className="createpost-button">
                        <button type="submit" className="post-button" style={{ marginTop: '5px' }}>Create Post</button>
                    </span>
                </span>
            </form>
        </div>
    )
}

export default CreatePost
