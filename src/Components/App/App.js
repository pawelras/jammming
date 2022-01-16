import './App.css';
import { Search } from '../search';
import banner from "../banner.png";
import { Results } from '../results';
import { Playlist } from '../playlist';
import React from 'react';
import { Spotify } from '../../util/spotify';

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  
    this.state = {
      searchResults: [
      /*{name: 'name1', artist: 'artist1', album: 'album1', id: 1, imgSrc: 'imgsrc1'},
      {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
      {name: 'name3', artist: 'artist3', album: 'album3', id: 3}*/
      ],

      playlistName: 'playlist-name',

      playlistTracks:   [/*{name: 'playlistName1', artist: 'playlstArtist1', album: 'playlistAlbum1', id: 4},
                        {name: 'playlistName2', artist: 'playlstArtist2', album: 'playlistAlbum2', id: 5},
                        {name: 'playlistName3', artist: 'playlstArtist3', album: 'playlistAlbum3', id: 6} */             
      ]
    }
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    if(tracks.filter(element => element.id === track.id).length === 0) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    };
  };

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(element => element.id !== track.id);
      this.setState({playlistTracks: tracks});

  }


  updatePlaylistName(newName) {
    this.setState({playlistName: newName});

  }

  savePlaylist() {
    const trackURIs = [];
    
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      trackURIs.push(this.state.playlistTracks[i].uri);
    }

    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(() => {
       this.setState({playlistName: 'New Playlist',
                      playlistTracks: [] });
    })
  };

componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  };
  
search(term) {
   Spotify.search(term)
  .then(searchResults => {
     this.setState({searchResults: searchResults});
})
};

render() {
  
    return (
      
      <div>
          <div className="banner"><img src={banner} alt="banner" /></div>
          <div className="App">
              <Search onSearch={this.search}/>
              <div className="mainApp">
                <Results 
                searchResults={this.state.searchResults} 
                onAdd={this.addTrack} />

                <Playlist 
                playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
                />
              </div>
              <footer>copyrignt &copy; PawelRas 2021 </footer>
          </div>
      </div>
      );
  };
};
