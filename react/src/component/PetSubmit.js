import React, {Component} from 'react';

class PetSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            petType: [],
            msg:"",
            petname:"",
            petimg:null,
            pettype:null,
        }
    }
    componentDidMount() {
        this.getPetType()
    }

    getPetType = (id) => {
        //fetch(`/pets/${id}`)
        fetch(`/pets/pettype`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({petType: res});
            });
    };

    handleInputChange = e => {
        //const value = e.target.value
        //const name = e.target.name
        const { value, name } = e.target;

        this.setState({
            [name]: value
        });
    };

    //add in msg alert
    //alert when they didn't insert a name or type of animal
    CreatePet = (e) => {
        // e.preventDefault()
        fetch('/pets/createpet', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({petname: this.state.petname, petimg: this.state.petimg, pettype_id: this.state.pettype})
        }).then(res => res.json()).then(res => {
            console.log(res)
            this.setState({msg: res.msg})
        })


    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-4">
                            <label>Pet name</label>
                            <input type="text" className="form-control" name="petname" onChange={e => this.handleInputChange(e)}/>
                        </div>
                        <div className="form-group col-md-2">
                            <label>Type of animal</label>
                            <select className="form-control" name="pettype" onChange={e => this.handleInputChange(e)}>
                                <option selected>Choose</option>
                                {this.state.petType.map(pettype => (
                                    <option value={pettype.id}>{pettype.pet_type}</option>
                                ) )}

                            </select>
                        </div>
                    </div>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-6">
                            <label>Pet image</label>
                            <input type="text" className="form-control" name="petimg" onChange={e => this.handleInputChange(e)}/>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center">
                    <button type="submit" className="btn btn-success" onClick={(e) => this.CreatePet(e)}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PetSubmit;