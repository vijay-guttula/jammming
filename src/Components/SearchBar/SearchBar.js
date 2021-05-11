import React from 'react';
import '../SearchBar/SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  render() {
    return (
      <div className='SearchBar'>
        <input
          placeholder='Enter a song or an artist or an album'
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) =>
            (e.target.placeholder = 'Enter a song or an artist or an album')
          }
          onChange={this.handleTermChange}
        />
        <button className='SearchButton' onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
