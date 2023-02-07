import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  TextField,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom"
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import { useState } from "react";
import WidgetWrapper from "../Components/WidgetWrapper";


const MyPostWidget = () => {
  const dispatch = useDispatch();
  const { _id, firstname, lastname } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const [newForm, setNewForm] = useState({
    firstname: `${firstname}`,
        lastname: `${lastname}`,
        owner: `${_id}`,
        title: "",
        body: ""
  })
  // api link
  const BASE_URL = "http://localhost:4000/posts/"

  const handlePostSubmit = async (e) => {
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
      dispatch(setPosts({ createdPost }));
      setNewForm({
        firstname: `${firstname}`,
        lastname: `${lastname}`,
        owner: `${_id}`,
        title: "",
        body: ""
      })
    } catch (err) {
      console.log(err)
    }
  }


console.log(firstname)
  const handleChange = (e) => {
    const userInput = { ...newForm }
    userInput[e.target.name] = e.target.value
    setNewForm(userInput)
}

  return (
    <WidgetWrapper>
      <Formik
        onSubmit={handlePostSubmit}
        >
      {({
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
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
        <InputBase
          placeholder="Body"
          sx={{
            width: "100%",
            height: "200px",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            marginTop: "1rem",
            textAlign: "top"
          }}
        />
        <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Create Post
        </Button>
      </form>
      )}
      </Formik>
    </WidgetWrapper>
    
  )
};

export default MyPostWidget;
