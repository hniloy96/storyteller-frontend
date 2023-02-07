import { Box, Typography, Divider, useMediaQuery, useTheme, TextField, Button, IconButton } from "@mui/material";
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import WidgetWrapper from "../Components/WidgetWrapper";


const Show = () => {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const { id } = useParams()
    const token = useSelector((state) => state.token)
    const { _id, firstname, lastname } = useSelector((state) => state.user)
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newForm, setNewForm] = useState({
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        comments: "",
        post: `${id}`,
    })

    // this page follows a smililar structure to album-detail page except an extra delete function and edit panel. 
    const navigate = useNavigate()
    const URL = `https://story-teller.herokuapp.com/posts/${id}`
    const POST_URL = "https://story-teller.herokuapp.com/interactions/"

    console.log(`Here is the token = ${token}`)



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

    console.log(post)

    const loaded = () => (
        <>
            <WidgetWrapper margin="10px">
                <div className="update-delete">
                    <Link className="link" to={`/post-update/${id}`}>
                        <Button
                            value="Edit"
                            type="submit"
                            sx={{
                                gridColumn: "span 4",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >Edit
                        </Button>

                    </Link>
                    <Button
                        onClick={removePost}
                        value="Delete"
                        type="submit"
                        sx={{
                            gridColumn: "span 4",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main },
                        }}
                    >Delete
                    </Button>
                </div>
                <Typography
                    marginTop="20px"
                    variant="h2"
                    color={dark}
                    fontWeight="500"
                >
                    {post.title}
                </Typography>

                <Typography
                    
                    marginBottom="20px"
                    variant="h5"
                    color={dark}
                    fontWeight="250"
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                    }}
                >
                    {post.firstname} {post.lastname}
                </Typography>
                <Divider />
                <Typography
                    marginTop="20px"
                    marginBottom="20px"
                    variant="h5"
                    color={dark}
                    fontWeight="500"
                >
                    {post.body}
                </Typography>

                <Box marginTop="20px">
                <form className="comment-section" onSubmit={handleSubmitComment}>
                <TextField
                            type="text"
                            onChange={handleChange}
                            placeholder='Type your comment'
                            id="comments"
                            name="comments"
                            value={newForm.comments}
                            required
                            
                            sx={{ gridColumn: "span 3", width: "510px" }}
                        />
                    <Button
                            value="Create Post"
                            type="submit"
                            sx={{
                                p: "1rem",
                                width: "130px",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >Comment
                        </Button>
                </form>
                </Box>
                
                
            </WidgetWrapper>

            <div>
                {comments?.map((comment) => {
                    return (
                        <WidgetWrapper margin="10px">
                            <Typography
                   
                    variant="h5"
                    color={dark}
                    fontWeight="250"
                >
                    {comment.firstname} {comment.lastname}
                </Typography>
                <Typography
                   
                    variant="h3"
                    color={dark}
                    fontWeight="500"
                >
                   {comment.comments}
                </Typography>

                        </WidgetWrapper>

                    )
                })}
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
                firstname: `${firstname}`,
                lastname: `${lastname}`,
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
            navigate('/home')
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