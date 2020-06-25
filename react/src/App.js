import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            pet: {},
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
                this.setState({pet: res});
            });
    };


    //can I put it as a function
    //instead of update(id)
    //what to put in here???
    //how to reset?
    updateCheckbox = id => {
        fetch(`/pets/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })
            // upon success, update checkbox
            .then(res => res.json())
            .then(json => {
                //fedcheckbox:json / pets:json
                this.setState({pet: json});
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
                        <ul class="list-group list-group-flush col-2 rounded">
                            <li className="list-group-item">
                                {/*check box TODO insert value*/}
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" checked={this.state.pet.DAY1}/>
                                    <label class="custom-control-label">Day 1</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY2}/>
                                    <label className="custom-control-label">Day 2</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY3}/>
                                    <label className="custom-control-label">Day 3</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY4}/>
                                    <label className="custom-control-label">Day 4</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY5}/>
                                    <label className="custom-control-label">Day 5</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY6}/>
                                    <label className="custom-control-label">Day 6</label>
                                </div>
                            </li>
                            <li className="list-group-item">
                                {/*check box*/}
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"
                                           checked={this.state.pet.DAY7}/>
                                    <label className="custom-control-label">Day 7</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default App;
