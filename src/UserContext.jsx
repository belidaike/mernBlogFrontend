import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mernblogbackend-n5y9.onrender.com/post')
                setPosts(response.data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    const filteredPosts = posts.filter(post => {
        return (
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.summary.toLowerCase().includes(search.toLowerCase()) ||
            post.author.username.toLowerCase().includes(search.toLowerCase())
        )
    })

    const handleChange = e => {
        setSearch(e.target.value)
    }
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, filteredPosts, handleChange, posts }}>
            {children}
        </UserContext.Provider>
    )
}
