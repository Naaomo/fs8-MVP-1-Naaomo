import React, {Component} from 'react';
import './ListofPets.css';

class ListofPets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
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

    boopedPet(pets) {
        this.setState({
            boopedid: pets.id,
            boopedname: pets.petname,
            boopedimg: pets.petimg,
            boopedtype: pets.pet_type,
        })
    }

    closeBox(e){
        this.setState({
            boopedname: "",
        })
    }
    //TODO fix the link to the checkbox

    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center mt-2">
                    {(this.state.boopedname) ?
                        <div className="card border-light mb-3 rounded">
                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between">Pet info
                                    <span>
                                    <button className="btn btn-danger col-1 pr-4"
                                            onClick={(e) => this.closeBox(e)}>X</button>
                                    </span>
                                </h5>
                                <img src={this.state.boopedimg} alt={this.state.boopedname} className="card-img-top img-thumbnail rounded"/>
                                <p className="card-text">{this.state.boopedname}</p>
                                <p className="card-text"> Type of pet: {this.state.boopedtype}</p>
                                <a href={`/${this.state.boopedid}`} className="btn btn-primary m-2">Bring me to
                                    checkbox</a>
                                <a href="#" className="btn btn-primary m-2">Bring me to weight chart</a>
                                <a href="#" className="btn btn-primary m-2">Bring me to vet schedule</a>
                            </div>

                        </div>
                        : null}
                </div>

                <h2 className="text-center">Your pet list</h2>
                <div className="container d-flex justify-content-center">
                    <ul className="list-group col-4 text-center">
                        {this.state.pets.map(pets => (
                            <li
                                key={pets.id}
                                className="list-group-item list-group-item-bg-light"
                            >
                                <span onClick={() => this.boopedPet(pets)}>
                                    <span className="text-left">{pets.petname}</span>
                                    {/*<span className="text-right">{pets.pet_type}</span>*/}
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