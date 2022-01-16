import React from "react";
import './playlist.css';
import { Tracklist } from "./tracklist";

export class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onNameChange(e.target.value);
    }
  
    render() {
        return (
        <div className="playlist">

            <input  placeholder={'Playlist Name'}
                    onChange={this.handleChange} 
                    className="playlistInput" 
                    type="text" />

            <Tracklist tracks={this.props.playlistTracks} 
                    onRemove={this.props.onRemove} 
                    isRemoval={true}/>

            <button className="playlistSave"
                    onClick={this.props.onSave}>
                    Save to Spotify
            </button>
            
        </div>
    )}
}