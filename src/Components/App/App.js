import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        { name: '1name', artist: '1_artist', album: '1_album', id: 1 },
        { name: '2name', artist: '2artist', album: '2_album', id: 2 },
        { name: '3name', artist: '3artist', album: '3_album', id: 3 },
        { name: '4name', artist: '4artist', album: '4_album', id: 4 },
      ],
      playlistName: 'Main',
      playlistTracks: [
        { name: '1name', artist: '1artist', album: '1album', id: 1 },
        { name: '2name', artist: '2artist', album: '2album', id: 2 },
        { name: '3name', artist: '3artist', album: '3album', id: 3 },
        { name: '6name', artist: '6artist', album: '6album', id: 6 },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
