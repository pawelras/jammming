import React from "react"
import './tracklist.css'
import {Track} from './track.js'

export class Tracklist extends React.Component {
    render() {
        return (
          
        <div className="tracklist"> 
           { this.props.tracks.map(track => {
             return <Track track={track}
                 key={track.id}
                 onAdd={this.props.onAdd}
                 onRemove={this.props.onRemove}   
                 isRemoval={this.props.isRemoval}
             />
         })}
        </div>
    )}
}