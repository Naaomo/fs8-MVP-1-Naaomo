import React, {Component} from 'react';

class ListofPets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets:[],
        }
    }

    componentDidMount() {
        this.getPets();
    }
    //get all pets
    getPets = () => {
        fetch(`/pets`)
            .then(res => res.json())
            .then(res => {

                this.setState({pets: res});
            });
    };

    render() {
        return (
            <div>
                <h2 className="text-center">Your pet list</h2>
                <div className="container d-flex justify-content-center">

                    <ul className="list-group col-4 text-center">
                        {this.state.pets.map(pets => (
                            <li
                                key={pets.id}
                                className="list-group-item list-group-item-bg-light mt-3"
                            >
                                <span>
                                  {pets.petname}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ListofPets;