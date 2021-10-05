import React from "react";
import './search.css';

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(e) {
        
        this.setState({term: e.target.value});
        
    }

    search() {
        this.props.onSearch(this.state.term);
    }
    render(){
        return(
            <div className="searchBar">
                <input 
                className ="inputField" 
                placeholder="Enter song or artist"
                onChange={this.handleTermChange}
                />
                <button onClick={this.search}
                className="searchButton">
                SEARCH</button>
            </div>
    )}
}