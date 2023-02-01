import { useState, useEffect } from "react"
import './Feed-page.css'
import { Link } from "react-router-dom"
import Nav from "../Components/Nav"
import { getUserToken } from "../utilities/authToken"

const Feed = (props) => {

    const token = getUserToken()
    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState({
        body: "",
        comments: [],
    })
    // api link
    const BASE_URL = "http://localhost:4000/posts/"
    // getting all the posts
    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
            setPosts(allPosts)

        } catch (err) {
            console.log(err)
        }
    }
    // submitting and rendering new post
    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...newForm }
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(BASE_URL, requestOptions)
            const createdPost = await response.json()
            setPosts([...posts, createdPost])
            setNewForm({
                body: "",
                comments: []
            })
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    const loaded = () => {
        return (
            <>
                <section className="posts-list">
                    {posts?.map((post) => {
                        return (
                            <Link className="individual" key={post._id} to={`/post/${post._id}`}>
                                <div className="post-card" >
                                    <h1>{post.body}</h1>
                                </div>
                            </Link>
                            

                        )
                    })
                    }
                </section>
            </>
        )
    }

    const loading = () => (
        <section className="loading">
            <span>
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt="loading"
                />{" "}
            </span>
        </section>
    );
        // api call
    useEffect(() => {
        getPosts()
    }, [])

    // rendering all the info
    return (
        <div className="page">
            <div className="Feed-content-container">
                <div className="create-post">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='body'>
                            <input
                                className="post-box"
                                type='text'
                                id="body"
                                name="body"
                                placeholder="What's in your mind?"
                                value={newForm.body}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <input
                        className="submit"
                            type="submit"
                            value="Create Post"
                        />
                    </form>
                </div>
                {posts && posts.length ? loaded() : loading()}
            </div>

            <div className="nav-bar">
                <Nav />
            </div>
        </div>

    )
}

export default Feed