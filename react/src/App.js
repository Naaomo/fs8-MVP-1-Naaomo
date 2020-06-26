import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            pet: {},
            loading: true,
        }
    }

    componentDidMount() {
        //fetch("/")
        this.getPet();
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
        //fetch(`/pets/${id}`, {
        fetch(`/pets/2/${day}`, {
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
                // alert(`whatever`)
            })
            .catch(error => {
                // upon failure, show error message
                console.log(error);
            });
    }


    render() {
        return (
            <div className="App">

                <div class="container text-center">
                    {/*TODO PUT INTO A COMPONENT*/}
                    <h2>Cat's name: {this.state.pet.petname}</h2>
                    <div class="container d-flex justify-content-center">
                        Have you fed your cats yet?
                    </div>
                    <div className="container d-flex justify-content-center">
                        <ul className="list-group list-group-flush col-3 rounded">
                            {/*need loading as it's not fetched yet.*/}
                            {(!this.state.loading) && Object.entries(this.state.pet.days).map(([day, value]) =>
                                <li className="list-group-item" key={day}>
                                    {/*check box TODO insert value*/}
                                    <div class="d-flex justify-content-between">
                                        <input type="checkbox"
                                               checked={value}
                                               onChange={() => this.updateCheckbox(day)}
                                        />
                                        <label>{day}</label>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
