import React from "react";
import './results.css';
import { Tracklist } from "./tracklist";

export class Results extends React.Component {

    
    render() {
        return (
            
        <div className="results">
            <div className="resultsHeading"><h2>Results</h2></div>
            <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>
        </div>)
    }
}