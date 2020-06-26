import React from 'react';
import './App.css';
import swal from 'sweetalert';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            pet: {},
            loading: true,
            text: "",
        }
    }

    componentDidMount() {
        //fetch("/")
        this.getPet();
        this.getCatFacts();
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
                // alert(`whatever`)
                    swal('You did it!','Chonky cat here we come','success')
            })
            .catch(error => {
                // upon failure, show error message
                console.log(error);
            });
    }


    //TODO Fix loading
    getCatFacts() {
        let url = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1";
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log(response)
                    return response.json();
                }
            })
            .then(data => {
                this.setState({text: data.text})
            })
            .catch(e => {
                console.log('There has been a problem with your fetch operation: ' + e.message);
            });
    }

    render() {
        return (
            <div className="App">
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
                <div className="container text-center col-5">
                    <div className="card text-white bg-cute mt-3">
                        <div className="card-header">
                            <img
                                className="img-fluid"
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56a8ee75-5900-4318-9c7d-f4de89314407/dcajegf-d1b8e359-9d08-411f-b15c-554f96a4ea68.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTZhOGVlNzUtNTkwMC00MzE4LTljN2QtZjRkZTg5MzE0NDA3XC9kY2FqZWdmLWQxYjhlMzU5LTlkMDgtNDExZi1iMTVjLTU1NGY5NmE0ZWE2OC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Mm4dymbBP3GqrTu5ZZYOL0A-VdeEcK99MrZjSpB8RjQ"
                            />
                            Cat fact of the day
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Did you know?</h5>
                            <p className="card-text">{this.state.text}</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
