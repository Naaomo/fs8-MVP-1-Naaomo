import React, {Component} from 'react';
import "./CatFacts.css";



class CatFacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
        }
    }

    componentDidMount() {
        this.getCatFacts()
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
            <div>
                <div className="container text-center col-5">
                    <div className="card text-white bg-cute mt-3">
                        <div className="card-header">
                            <img
                                className="img-fluid"
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56a8ee75-5900-4318-9c7d-f4de89314407/dcajegf-d1b8e359-9d08-411f-b15c-554f96a4ea68.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTZhOGVlNzUtNTkwMC00MzE4LTljN2QtZjRkZTg5MzE0NDA3XC9kY2FqZWdmLWQxYjhlMzU5LTlkMDgtNDExZi1iMTVjLTU1NGY5NmE0ZWE2OC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Mm4dymbBP3GqrTu5ZZYOL0A-VdeEcK99MrZjSpB8RjQ"
                                alt='a cat'
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

export default CatFacts;