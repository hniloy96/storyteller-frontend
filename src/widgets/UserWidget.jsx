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

const UserWidget = ({ userId, picturePath }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:4000/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setLoading(false)
  };


  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(user)

  if (!user) {
    return null;
  }

  const {
    firstname,
    lastname,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        // onClick={() => navigate(`/user/${userId}`)}
      >
      <FlexBetween gap="1rem">
          <Box>
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
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
        </FlexBetween>

        <Divider />

        <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
};

export default UserWidget;
