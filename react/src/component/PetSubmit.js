import React, {Component} from 'react';

class PetSubmit extends Component {
    componentDidMount() {
        //this.getpettype()
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-row justify-content-center">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputPetname">Pet name</label>
                            <input type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="inputTypeofname">Type of animal</label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose</option>
                                <option>Cat</option>
                            </select>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PetSubmit;