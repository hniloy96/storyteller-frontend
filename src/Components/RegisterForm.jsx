import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// registerform for signing up being rendered in sign-upAuth page
const RegisterForm = ({ signUp }) => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signUp(input)

        if (createdUserToken) {
            navigate("/home")
        } else {
            navigate("/")
        }
        setInput(initialState);
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    return (
        <section className='register-form'>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Sign Up</h1>
                <label htmlFor='username'>
                    <input
                        className="username"
                        type='text'
                        id='username'
                        name="username"
                        placeholder="User Name"
                        value={input.username}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='password'>
                    <input
                        className="username"
                        type='password'
                        id='password'
                        name="password"
                        placeholder="Enter Password"
                        value={input.password}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='email'>
                    <input
                        className="email"
                        type='text'
                        id='email'
                        name="email"
                        placeholder="Email Address"
                        value={input.email}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='firstname'>
                    <input
                        className="username"
                        type='text'
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        value={input.firstname}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='lastname'>
                    <input
                        className="username"
                        type='text'
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        value={input.lastname}
                        onChange={handleChange}
                        required

                    />
                </label>
                <label htmlFor='date'>
                    <input
                        className="username"
                        type='date'
                        id="dob"
                        name="dob"
                        placeholder="Date of Birth"
                        value={input.dob}
                        onChange={handleChange}
                        required

                    />
                </label>
                <input
                    className="submit"
                    type="submit"
                    value="Sign Up"
                />
            </form>
            <Link className='link-container' to='/'>
                    <h3 className='link'>Log in Here</h3>
                </Link>
        </section>
    )
}

export default RegisterForm