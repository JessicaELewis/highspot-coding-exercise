import React from 'react';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: props.input,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({input: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onClick(this.state.input);
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="search" value={this.state.input} onChange={this.handleChange} type="text" placeholder="Name of Card"></input>
                <button type="submit">
                    <span>Search</span>
                </button>
            </form>
        )
    }

}

export default Search;