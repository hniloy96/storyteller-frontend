import { Link } from "react-router-dom";
import { clearUserToken } from "../utilities/authToken"
import { useNavigate } from "react-router-dom";


// rendering the nav bar that is ever so present thoughout all the pages! 
const Nav = (props) => {

    const navigation = useNavigate()
    // to delete token and user info for logging out purposes 
    const handleSubmit = async (e) => {
       clearUserToken()
       navigation('/')
       

    }

    return (
        <div className="nav-list">
            <Link to="/feed">
                <h1 className="list-items">Story Teller</h1>
            </Link>
            <Link to="/home">
                <div className="list-items">Home</div>
            </Link>
            <Link to="/feed">
                <div className="list-items">Feed</div>
            </Link>
            <button
                type="submit"
                className="log-out"
                onClick={handleSubmit}
                >
                    Log Out
                </button>
        </div>
    );
};

export default Nav;