import React, {useState}from 'react';
import {navigate} from "@reach/router";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const result = await(await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })).json();

        if(!result.error){
            console.log(result.message);
            navigate('/');
        }else{
            console.log(result.error);
        }

    };


    const handleChange = e => {
        if(e.currentTarget.name === 'name'){
            setName(e.currentTarget.value);
        }else if(e.currentTarget.name === 'email'){
            setEmail(e.currentTarget.value);
        }else{
            setPassword(e.currentTarget.value);
        }
    }

    return (
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit}>
                <h2>Register A User</h2>
                <div className='login-input'>
                    <input
                        value={name}
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Your name'
                        autoComplete='name'
                    />
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
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    );

}

export default Register;