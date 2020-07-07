import React, {useState, useEffect} from 'react';
import {Router, navigate} from '@reach/router';
import './App.css';

import Navigation from "./component/Navigation";
import Login from "./component/Login";
import Register from "./component/Register";
import Main from "./Main";

export const UserContext = React.createContext([]);

function App(){
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const logOutCallback = async () => {
        await fetch('http://localhost:3000/users/logout', {
            method: 'POST',
            credentials: 'include'
        })
        // Clear user from context
        setUser({});
        // Navigate back to home page
        navigate('/');
    }

    // First thing, get a new accessToken if a refreshToken exist
    useEffect(() => {
        async function checkRefreshToken(){
            const result = await (await fetch('http://localhost:3000/users/refresh_token', {
                method: 'POST',
                credentials: 'include', //Needed to include the cookie,
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();
            setUser({
                accessToken: result.accessToken,
            });
            setLoading(false);
        }
        checkRefreshToken();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <UserContext.Provider value={[user, setUser]}>
            <div className='app'>
                <Navigation logOutCallback={() => logOutCallback()} />
                <Router id="router">
                    <Login path="login" />
                    <Register path="register" />
                    <Main path="/" />
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;