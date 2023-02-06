import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import state from '../../state';
import UserWidget from '../../widgets/UserWidget';
import Navbar from '../Navbar'

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id } = useSelector((state) => state.user);
    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            ></Box>
            <Box flexBasis={ isNonMobileScreens ? "26%" : undefined }>
                <UserWidget userId={_id} />
            </Box>
            <Box flexBasis={ isNonMobileScreens ? "42%" : undefined } mt={isNonMobileScreens ? undefined : "2rem"}>

            </Box>
            {isNonMobileScreens && (
                <Box flexBasis="26%"></Box>
            )}
        </Box>
    )
}

export default HomePage;