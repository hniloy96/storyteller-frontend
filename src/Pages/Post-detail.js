import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getUserToken } from "../utilities/authToken"

const Show = (props) => {

    const { id } = useParams()
    const token = getUserToken()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newForm, setNewForm] = useState({
        comments: "",
        post: `${id}`
    })
    
    // this page follows a smililar structure to album-detail page except an extra delete function and edit panel. 
    const navigate = useNavigate()
    const URL = `http://localhost:4000/posts/${id}`
    const POST_URL = "http://localhost:4000/interactions/"


    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            setTimeout(() => {
                setPost(result.post)
                setComments(result.comments)
                setLoading(false)
            })

        } catch (err) {
            console.log(err)
        }
    }



    const loaded = () => (
        <>

            <div className="Big-post">

                <div className="update-delete">
                    <Link className="update" to={`/post-update/${id}`}>
                        <button className="update-button">Edit</button>
                    </Link>
                    
                    <button className="delete-button" onClick={removePost}>
                        Delete post
                    </button>
                </div>
                <h2>{post.body}</h2>
                <form className="comment-section" onSubmit={handleSubmitComment}>
                    <input 
                        className="write-comment"
                        type="text"
                        onChange={handleChange}
                        placeholder='Type your comment'
                        id="comments"
                        name="comments"
                        value={newForm.comments}
                        required
                    >

                    </input>
                    <button
                        className="submit-comment"
                        type="submit"
                    >Comment</button>
                </form>
                <div>
                    {comments?.map((comment) => {
                        return (
                            <h4>{comment.comments}</h4>
                        )
                    })}
                </div>
            </div>




        </>

    )

    const handleSubmitComment = async (e) => {
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
            
            const send = await fetch(POST_URL, requestOptions)
            const result = await send.json()
            setComments([...comments, result])
            setNewForm({
                comments: "",
                post: `${id}`
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
    // this is to delete the post
    const removePost = async () => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }

            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
        } catch (err) {
            navigate(URL)
        } finally {
            navigate('/feed')
        }
    }

    const isLoading = () => (
        <section className="loading">
            <h1>
                Loading...
                <span>
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                        alt="loading"
                    />{" "}
                </span>
            </h1>
        </section>
    );


    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="page">
            <div className="Feed-content-container">
                <div>
                    {loading ? isLoading() : loaded()}
                </div>

            </div>
        </div>

    )
}

export default Show