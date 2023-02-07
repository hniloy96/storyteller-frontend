import {
    ManageAccountsOutlined,
    AccountCircle,
    ContactMail
  } from "@mui/icons-material";
  import { Box, Typography, Divider, useTheme } from "@mui/material";
  import FlexBetween from "../Components/FlexBetween";
  import WidgetWrapper from "../Components/WidgetWrapper";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Link } from "react-router-dom"
  

  const UserWidget = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const BASE_URL = `http://localhost:4000/user/${_id}`
  
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
      id,
      firstname,
      lastname,
      email,
      friends,
    } = currentUser;
  
    console.log(`first name is ${id}`)
  
    return (
      <div>
        <WidgetWrapper>
          <Link className="link" key={id}  to={`/Profile`}>
          <FlexBetween gap="1rem">
          <AccountCircle />
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
          </FlexBetween>
          </Link>
          
          <Typography color={medium}>{friends.length} friends</Typography>
          <Divider />
          <FlexBetween marginTop="5px" gap="1rem">
          <ContactMail />
          <Typography
                variant="h5"
                color={dark}
                fontWeight="250"
              >
              Email: {email}
          </Typography>
          </FlexBetween>
          
  
  
        </WidgetWrapper>
      </div>
    );
  };
  
  export default UserWidget;
  