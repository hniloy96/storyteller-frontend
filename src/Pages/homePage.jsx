import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../Sections/Navbar";
import UserWidget from "../Sections/UserWidget";
import FeedPage from "../Sections/Feed-page"



const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
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
          <UserWidget userId={_id}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <FeedPage />
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
