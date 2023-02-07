import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import WidgetWrapper from "../Components/WidgetWrapper";
import { Box, Typography, useMediaQuery, useTheme, TextField, Button, IconButton } from "@mui/material";
import {
    Close,
  } from "@mui/icons-material";

const Show = () => {

    const token = useSelector((state) => state.token)
    const [post, setPost] = useState(null)
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [comments, setComments] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newForm, setNewForm] = useState({
        body: "",
    })

    const { id } = useParams()
    const navigate = useNavigate()
    const URL = `http://localhost:4000/posts/${id}`


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
            <WidgetWrapper margin="10px">
            <div className="">
                    <Link className="link" key={post._id} to={`/post/${post._id}`}>
                    <IconButton>
                        <Close />
                    </IconButton>
                    </Link>
                    
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
                    <form onSubmit={updatePost}>
                    <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
                        <TextField
                            fullWidth
                            type='text'
                            id="body"
                            name="body"
                            placeholder={post.body}
                            value={newForm.body}
                            onChange={handleChange}
                            multiline
                            rows={5}
                            required
                            sx={{ gridColumn: "span 4" }}

                           
                            
                        />
                        <Button
                            value="Create Post"
                            type="submit"
                            sx={{
                                p: "1rem",
                                gridColumn: "span 4",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >Update your Story
                        </Button>
                        </Box>
                    </form>
                </WidgetWrapper>
            </div>




        </>

    )

    const updatePost = async (e) => {
        e.preventDefault()
        const currentState = { ...newForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(URL, requestOptions)
            const createdComment = await response.json()
            setComments([...comments, createdComment])
            navigate(`/post/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
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