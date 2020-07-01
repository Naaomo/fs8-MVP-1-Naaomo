import React, {Component} from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <div className="container d-flex justify-content-center">
                    Have you fed your cat yet?
                </div>
                <div className="container d-flex justify-content-center">
                    <ul className="list-group list-group-flush col-3 rounded">
                        {/*need loading as it's not fetched yet.*/}
                        {(!this.props.loading) && Object.entries(this.props.Checkboxes.days).map(([day, value]) =>
                            <li className="list-group-item" key={day}>
                                {/*check box*/}
                                <div className="container d-flex justify-content-lg-between mt-2">
                                    <div className="pretty p-icon p-round p-tada">
                                        <input type="checkbox" checked={value}
                                               onChange={() => this.props.UpdateCheckbox(day)}/>
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
        );
    }
}

export default Checkbox;