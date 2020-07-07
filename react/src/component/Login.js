import React, {useState, useContext, useEffect}from 'react';
import {navigate} from "@reach/router";
import {UserContext} from "../App";

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await(await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })).json();

        if (result.accessToken){
            setUser({
                accessToken: result.accessToken
            });
            navigate('/');
        }else{
            console.log(result.error);
        }
    };

    useEffect(() => {
        console.log(user.accessToken);
    }, [user])

    const handleChange = e => {
        if(e.currentTarget.name === 'email'){
            setEmail(e.currentTarget.value);
        }else{
            setPassword(e.currentTarget.value);
        }
    }

    return (
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='login-input'>
                    <input
                        value={email}
                        onChange={handleChange}
                        type='text'
                        name='email'
                        placeholder='email'
                        autoComplete='email'
                    />
                    <input
                        value={password}
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='current-password'
                    />
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );

}

export default Login;