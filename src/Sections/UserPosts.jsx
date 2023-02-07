import { Box, Typography, Divider, useMediaQuery, useTheme, TextField, Button } from "@mui/material";
import WidgetWrapper from "../Components/WidgetWrapper";
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux";

const Feed = (props) => {
    const { id } = useParams()
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
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
    const BASE_URL = `http://localhost:4000/user/posts/${id}`
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
            <div>
                {posts && posts.length ? loaded() : loading()}
            </div>


        </div>

    )
}

export default Feed