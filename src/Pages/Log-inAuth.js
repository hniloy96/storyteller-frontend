import { useContext } from 'react'
import { UserContext } from '../data'
import { setUserToken, clearUserToken } from '../utilities/authToken'
import LoginForm from '../Components/LoginForm'
import './signin.css'




function Auth() {
	const {setAuth, setUser} = useContext(UserContext)

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const response = await fetch(
                "http://localhost:4000/user/login",
                configs
            )
    
            const currentUser = await response.json()
     
    
            if (currentUser.token) {
                setUserToken(currentUser.token)
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
    
                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }
    


  return (
        <div className='page'>
            <div className="Signin-content-container">
                <LoginForm  logIn={loginUser} />
                
            </div>
            
        </div>
        
    )
}

export default Auth;

