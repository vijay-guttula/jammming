import React from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'Main',
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let newTracks = this.state.playlistTracks.filter(
      (newTrack) => newTrack.id !== track.id
    );
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);

    try {
      if (trackUris.length) {
        Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
          this.setState({
            playlistName: 'New Playlist',
            playlistTracks: [],
          });
        });
        alert('Playlist saved!');
        return;
      }
      throw new Error();
    } catch (e) {
      alert('Add songs to save.');
    }
  }

  search(term) {
    // const newSearchResults = Spotify.search(term);
    // this.setState({ searchResults: newSearchResults });

    // linking search to spotify api
    Spotify.search(term).then((newSearchResults) => {
      this.setState({ searchResults: newSearchResults });
    });
  }

  render() {
    return (
      <div className='container'>
        <header>
          <h1>
            Ja<span className='highlight'>mmm</span>ing
          </h1>
        </header>
        <article>
          <SearchBar onSearch={this.search} />
        </article>
        <section>
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </section>
      </div>
    );
  }
}

export default App;
