import React, { useState, useEffect, useContext } from 'react'
import ReactQuill from 'react-quill'
import { UserContext } from "../UserContext"
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('art')
    const [files, setFiles] = useState(null)
    const { id } = useParams()
    const nav = useNavigate()
    const { userInfo } = useContext(UserContext)
    useEffect(() => {
        if (!userInfo) {
            nav('/login')
        }
    })

    useEffect(() => {
        fetch(`https://mernblogbackend-n5y9.onrender.com/post/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title)
                setSummary(data.summary)
                setContent(data.content)
                setCategory(data.category)
            })
    }, [id])

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link']
        ]
    }

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'link'
    ]

    const updatePost = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('category', category)
        if (files && files?.[0]) {
            data.set('file', files?.[0])
        }

        const response = await fetch(`https://mernblogbackend-n5y9.onrender.com/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include'
        })
        if (response.ok) {
            nav(`/post/${id}`)
        }
    }

    return (
        <form onSubmit={updatePost} className="d-flex flex-column w-50 align-items-center justify-content-center h-100" style={{ margin: '0 auto' }}>
            <span className="createpost d-flex flex-column gap-2 bg-white p-3 rounded-3">
                <input className="createpost-input" required type="title" placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)} />
                <label className="" htmlFor="category">Choose a Category:</label>
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
                <input required type="file" onChange={(e => setFiles(e.target.files))} />
                <ReactQuill required value={content} onChange={newValue => setContent(newValue)} modules={modules} format={formats} />
                <br /><br />
                <span className="createpost-button">
                    <button type="submit" className="post-button " style={{ marginTop: '5px' }}>Create Post</button>
                </span>

            </span>
        </form>
    )
}

export default EditPost
