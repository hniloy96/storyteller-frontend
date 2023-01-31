import { useContext } from 'react'
import { UserContext } from '../data'
import { setUserToken, clearUserToken } from '../utilities/authToken'
import RegisterForm from '../Components/RegisterForm'
import './signin.css'




function Auth() {
	const {setAuth, setUser} = useContext(UserContext)

    const registerUser = async (data) => {
        try {
    
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const newUser = await fetch(
                "https://serenomusic.herokuapp.com/user/register",
                configs
            )
    
            const parsedUser = await newUser.json()
        
            setUserToken(parsedUser.token)
           
            setUser(parsedUser.user)
  
            setAuth(parsedUser.isLoggedIn)
    
         
    
            return parsedUser

        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }

  return (
        <div className='page'>
            <div className="Signin-content-container">
                <RegisterForm signUp={registerUser} />
                
            </div>
        </div>
        
    )
}

export default Auth;

