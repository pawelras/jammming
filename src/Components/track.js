import React from "react";
import './track.css';

export class Track extends React.Component {

    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        }
    
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    addTrack() {
     this.props.onAdd(this.props.track);
    }


    renderAction() {
        if (this.props.isRemoval) {
            return <button className="trackAction" onClick={this.removeTrack}> - </button>
        } else {
            return <button className="trackAction" onClick={this.addTrack}> + </button>
        }

    
    }
    
    render() {
         return (
            <div className="track">
            <div className="thumb" ><img src={this.props.track.imgSrc} alt="album cover"/></div>
                <div className="trackInformation">
                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
           </div>
        )
    }

   
}