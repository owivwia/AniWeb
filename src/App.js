import React, { useState, useEffect } from 'react';

import AnimeCard from './AnimeCard';

import './App.css';
import SearchIcon  from './search.svg';

const API_URL = 'https://api.jikan.moe/v4';

const App = () => {
const [animes, setAnimes] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

  const searchAnimeByTitle = async (title) => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`${API_URL}/anime?q=${encodedTitle}`);
      const data = await response.json();
      
      console.log(data.data);
      setAnimes(data.data);
    } catch (error) {
      console.error('Error searching for anime:', error);
    }
  };
  
  // not commented out due to warning, was used for testing in earlier stages
  useEffect(() => {
    searchAnimeByTitle(''); 
  }, []);

  return (
    <div className="app">
      <h1>AniWeb</h1>

      <div className="search">
        <input 
          placeholder="Search for animes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // also makes search possible if press enter key
          onKeyPress={(e) => {
            searchAnimeByTitle(searchTerm);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={(e) => searchAnimeByTitle(searchTerm)}
        />
      </div>

    {animes?.length > 0
      ? (
        <div className="container">
          {animes.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No animes found</h2>
        </div>
      )}


    </div>
  );
}

export default App;