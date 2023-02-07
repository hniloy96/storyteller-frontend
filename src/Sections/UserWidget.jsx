import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "../Components/FlexBetween";
import WidgetWrapper from "../Components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const BASE_URL = `http://localhost:4000/user/${userId}`

  const getUser = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        setCurrentUser(data)

    } catch (err) {
        console.log(err)
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])

  if (!currentUser) {
    return null;
  }

  const {
    firstname,
    lastname,
    email,
    friends,
  } = currentUser;

  console.log(`first name is ${email}`)

  return (
    <div>
      <WidgetWrapper>
      <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstname} {lastname}
        </Typography>
        <Typography color={medium}>{friends.length} friends</Typography>
        <ManageAccountsOutlined />
        <Divider />
        <Typography
              variant="h5"
              color={dark}
              fontWeight="250"
            >
            Email: {email}
        </Typography>


      </WidgetWrapper>
    </div>
  );
};

export default UserWidget;
