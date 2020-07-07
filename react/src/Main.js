//Use hook for style components
import React, { useState } from 'react';
import {Redirect} from '@reach/router';
import {UserContext} from "./App";
// import React from 'react';
//import CSS
import './Main.css';
//import for theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './component/theme';
import {GlobalStyles} from './component/DefaultTheme';
//import components
import ListofPets from "./component/ListofPets";
import CatFacts from "./component/CatFacts";
import Checkbox from "./component/Checkbox";
import PetSubmit from "./component/PetSubmit";
//import extra
import Swal from 'sweetalert2';

// With style components
// The function that toggles between themes
export function LD() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Return the layout based on the current theme
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <div>
                <GlobalStyles/>
                {/*Pass the toggle functionality to the button*/}
                <div className="d-flex justify-content-end">
                    <label className="switch">
                        <input type="checkbox" id="togBtn" onClick={toggleTheme}/>
                        <div className="slider round">
                            <span className="Light" role="img">🌞</span>
                            <span className="Dark">🌙</span>
                        </div>
                    </label>
                </div>
                {/*<h1></h1>*/}
                <footer>
                </footer>
            </div>
        </ThemeProvider>
    );
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pet: {},
            loading: true,
        }
    }

    componentDidMount() {
        this.getPet();
        // this.getCatFacts();
    }

    //get a pet's stuff
    getPet = (id) => {
        //fetch(`/pets/${id}`)
        fetch(`/pets/1`)
            .then(res => res.json())
            .then(res => {
                // console.log(res.days.day1)
                console.log(res)
                this.setState({pet: res, loading: false});
            });
    };

    updateCheckbox = day => {
        //fetch(`/pets/update/${id}`, {
        fetch(`/pets/update/1/${day}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
            // upon success, update checkbox
            .then(res => res.json())
            .then(json => {
                this.setState(prevState => ({pet: {...prevState.pet, days: json}}));
            })
            .catch(error => {
                // upon failure, show error message
                console.log(error);
            });
    }

    //ResetCheckbox
    componentDidUpdate() {
        if (Object.values(this.state.pet.days).every(day => day)) {
            this.resetCheckbox()
        }
    }

    resetCheckbox = () => {
        fetch(`/pets/reset/1`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
            // upon success, update checkbox
            .then(res => res.json())
            .then(json => {
                this.setState(prevState => ({
                    pet: {
                        ...prevState.pet,
                        days: {Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0}
                    }
                }));
                Swal.fire({
                    title: 'Your cat is well fed!',
                    text: `Chonky cat in the making much?`,
                    confirmButtonText: `Oh lawd here it comes!`,
                    backdrop: `rgba(255,255,255,0.4)
                               url("https://media0.giphy.com/media/3ov9k8fmDbIqzzbsLS/giphy.gif")
                               center
                               no-repeat`
                })
            })
            .catch(error => {
                // upon failure, show error message
                console.log(error);
            });
    }

    // ToggleTheme= () =>{
    //     this.setState({
    //         light: !this.state.light
    //     })
    // }


    render() {
        Main.contextType = UserContext;
        let user = this.context;
        console.log(user);
        if (!user[0]) return (<Redirect from='' to='/login' noThrow />);
        return (
            <div>
            <LD/>
            <PetSubmit/>
            <ListofPets ListofPets = {this.state.pets}/>
                {/*good practice way*/}
                {/*<button*/}
                {/*    className={this.state.light ? "btn btn-info" : "btn btn-primary bg-primary"}*/}
                {/*    onClick={() => this.ToggleTheme()}>theme*/}
                {/*</button>*/}
                <div className="container text-center">
                    <h2>Cat's name: {this.state.pet.petname}</h2>
                    <Checkbox UpdateCheckbox ={Checkedday => this.updateCheckbox(Checkedday)}
                              loading = {this.state.loading}
                              Checkboxes = {this.state.pet}/>
                </div>                <div><CatFacts/></div>
            </div>
        );
    }
}

export default Main;