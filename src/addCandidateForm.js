import React from 'react';

class addCandidateForm extends React.PureComponent {

    state = {
        "name": "",
        "lastname": "",
        "email": "",
        "role": "",
        "company": "",
        "workshop": "0",
        "is_lecture": false,
        "motivation": "",
    }

    addCandidate = (newCandidate) => {
        fetch('http://localhost:3001/candidates/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCandidate)
        })
            .then(response => (response.text()))
            .then(resp => alert(resp))
    }

    generateOptions = () => {
        const possibleWorkshops = [0, 1, 2, 3, 4, 5, 6]
        return possibleWorkshops.map((value) => (
            <option key={value} value={value}>{value}</option>
        ))
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleIsLecture = () => {
        this.setState({
            is_lecture: !this.state.is_lecture
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newCandidate = this.state;
        const errors = this.validateCandidate(newCandidate)
        if (errors.length === 0) this.addCandidate(newCandidate)
        else alert(errors)
    }

    validateCandidate = (newCandidate) => {

        const errors = [];

        if (this.state.name.length < 2) errors.push("\nName should be at least two letters long");
        if (this.state.lastname.length < 2) errors.push("\nLast Name should be at least two letters long");
        if (this.state.email.length < 5) errors.push("\nEmail should be at least five characters long");
        if (this.state.email.split("").filter(x => x === "@").length !== 1) errors.push("\nEmail should contain a @");
        if (this.state.email.indexOf(".") === -1) errors.push("\nEmail should contain at least one dot");
        if (this.state.role.length < 2) errors.push("\nPlease fill the role field");
        if (this.state.company.length < 2) errors.push("\nPlease fill the workplace field");
        if (this.state.motivation.length < 10) errors.push("\nPlease let us know what is Your motivation");

        return errors
    }

    render() {
        return (
            <div className="addCandidate">
                <form>
                    <p>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' onChange={this.handleOnChange} required="required"></input>
                    </p>
                    <p>
                        <label htmlFor='lastname'>Last name:</label>
                        <input type='text' name='lastname' onChange={this.handleOnChange} required></input>
                    </p>
                    <p>
                        <label htmlFor='email'>email:</label>
                        <input type='email' name='email' onChange={this.handleOnChange} required></input>
                    </p>
                    <p>
                        <label htmlFor='role'>Your role:</label>
                        <input type='text' name='role' onChange={this.handleOnChange} required></input>
                    </p>
                    <p>
                        <label htmlFor='company'>Workplace:</label>
                        <input type='text' name='company' onChange={this.handleOnChange} required></input>
                    </p>
                    <p>
                        <label htmlFor='workshop'>Workshop (0 - not interested):</label>
                        <select onChange={this.handleOnChange} name='workshop'>
                            {this.generateOptions()}
                        </select>
                    </p>
                    <p>
                        <label htmlFor='is_lecture'>Lecture:</label>
                        <input type='checkbox' name='is_lecture' onChange={this.handleIsLecture}></input>
                    </p>
                    <p>
                        <label htmlFor='motivation'>Your motivation:</label>
                        <textarea name='motivation' onChange={this.handleOnChange} required></textarea>
                    </p>
                    <p>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </p>
                </form>
            </div>
        );
    }
};

export default addCandidateForm;