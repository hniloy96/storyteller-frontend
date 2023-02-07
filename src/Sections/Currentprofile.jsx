import { Box, Typography, Divider, useMediaQuery, useTheme, TextField, Button } from "@mui/material";
import WidgetWrapper from "../Components/WidgetWrapper";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

const Currentprofile = () => {

    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const token = useSelector((state) => state.token)
    const { _id, firstname, lastname } = useSelector((state) => state.user)
    const [posts, setPosts] = useState([])
    const [newForm, setNewForm] = useState({
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        title: "",
        description: "",
        body: [],
        owner: `${_id}`
    })
    // api link
    const BASE_URL = `https://story-teller.herokuapp.com/user/posts/${_id}`
    const Post_URL = "https://story-teller.herokuapp.com/posts"
    // getting all the posts
    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
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
            const response = await fetch(Post_URL, requestOptions)
            const createdPost = await response.json()
            setPosts([...posts, createdPost])
            setNewForm({
                firstname: `${firstname}`,
                lastname: `${lastname}`,
                title: "",
                description: "",
                body: [],
                owner: `${_id}`
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

                            <WidgetWrapper margin="10px">

                                <Box>
                                   
                                    <Typography
                                        variant="h5"
                                        color={dark}
                                        fontWeight="250"
                                     
                                    >
                                        {post.firstname} {post.lastname}
                                    </Typography>
                                
                                    <Typography
                                        variant="h2"
                                        color={dark}
                                        fontWeight="500"
                                    >
                                        {post.title}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        marginTop="0px"
                                        color={dark}
                                        fontWeight="250"

                                    >
                                        {post.description}
                                    </Typography>
                                    <Divider />
                                    <Link className="link" key={post._id} to={`/post/${post._id}`}>
                                        <Typography
                                            variant="h6"
                                            marginTop="10px"
                                            color={dark}
                                            fontWeight="500"
                                            sx={{
                                                "&:hover": {
                                                    color: palette.primary.light,
                                                    cursor: "pointer",
                                                },
                                            }}
                                        >
                                            Click here to read
                                        </Typography>
                                    </Link>


                                </Box>

                            </WidgetWrapper>




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
            <div className="post">
                <WidgetWrapper margin="10px">
                    <form onSubmit={handleSubmit}>
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
                            id="title"
                            name="title"
                            placeholder="Provide a Title!"
                            value={newForm.title}
                            onChange={handleChange}
                            required
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            type='description'
                            id="description"
                            name="description"
                            placeholder="Provide a simple Description"
                            value={newForm.description}
                            onChange={handleChange}
                            required
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            fullWidth
                            type='text'
                            id="body"
                            name="body"
                            placeholder="Write away!"
                            value={newForm.body}
                            onChange={handleChange}
                            required
                            multiline
                            rows={5}
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
                        >Post your Story
                        </Button>
                        </Box>
                    </form>
                </WidgetWrapper>
            </div>
            <div>
                {posts && posts.length ? loaded() : loading()}
            </div>


        </div>

    )
}

export default Currentprofile