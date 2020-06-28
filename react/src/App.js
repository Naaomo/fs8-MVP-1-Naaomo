//Use hook
import React, { useState } from 'react';
// import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './component/theme';
import {GlobalStyles} from './component/DefaultTheme';
import Catfacts from "./component/catfacts";
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
                <div class="d-flex justify-content-end">
                    <label className="switch">
                        <input type="checkbox" id="togBtn" onClick={toggleTheme}/>
                        <div className="slider round">
                            <span className="Light">🌞</span>
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


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            pet: {},
            loading: true,
            light: true,
        }
    }

    componentDidMount() {
        this.getPet();
        // this.getCatFacts();
    }

    // getPets = () => {
    //     fetch(`/pets`)
    //         .then(res => res.json())
    //         .then(res => {
    //
    //             this.setState({pets: res});
    //         });
    // };

    //get a pet's stuff
    getPet = (id) => {
        //fetch(`/pets/${id}`)
        fetch(`/pets/2`)
            .then(res => res.json())
            .then(res => {
                // console.log(res.days.day1)
                console.log(res)
                this.setState({pet: res, loading: false});
            });
    };

    updateCheckbox = day => {
        //fetch(`/pets/update/${id}`, {
        fetch(`/pets/update/2/${day}`, {
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
        fetch(`/pets/reset/2`, {
            method: "POST",
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
        return (
            <div>
            <LD/>
                {/*good practice way*/}
                {/*<button*/}
                {/*    className={this.state.light ? "btn btn-info" : "btn btn-primary bg-primary"}*/}
                {/*    onClick={() => this.ToggleTheme()}>theme*/}
                {/*</button>*/}
                <div class="container text-center">
                    {/*TODO PUT INTO A COMPONENT*/}
                    <h2>Cat's name: {this.state.pet.petname}</h2>
                    <div class="container d-flex justify-content-center">
                        Have you fed your cat yet?
                    </div>
                    <div className="container d-flex justify-content-center">
                        <ul className="list-group list-group-flush col-3 rounded">
                            {/*need loading as it's not fetched yet.*/}
                            {(!this.state.loading) && Object.entries(this.state.pet.days).map(([day, value]) =>
                                <li className="list-group-item" key={day}>
                                    {/*check box*/}
                                    <div className="container d-flex justify-content-lg-between mt-2">
                                        <div className="pretty p-icon p-round p-tada">
                                            <input type="checkbox" checked={value}
                                                   onChange={() => this.updateCheckbox(day)}/>
                                            <div className="state p-primary-o ">
                                                <i className="icon mdi mdi-paw"></i>
                                                <label>{day}</label>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div><Catfacts/></div>
            </div>
        );
    }
}

export default App;