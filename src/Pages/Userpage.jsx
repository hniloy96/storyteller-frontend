import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Sections/Navbar";
import UserWidget from "../Sections/UserWidget";
import UserPosts from "../Sections/UserPosts"
import { useParams } from "react-router";
import CurrentUser from "../Sections/Currentuser"



const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const { id } = useParams()
  console.log(`the id is ${_id}`)
  
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <CurrentUser />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <UserWidget userId={id}/>
        <UserPosts />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
    
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
