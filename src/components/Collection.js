import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from  'axios';
import '../style/Collection.css'

class Collection extends Component {
  constructor(props){
    super(props);
    this.state = { movies: [] };
  }

  genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Drama: 18,
    Fantasy: 14,
    History: 36
  };

  updateGenres(e, genre){
    this.getMoviesByGenre(this.genres[genre]);
  }

  getMoviesByGenre = query => {
   axios 
      .get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${query}&api_key=ad1dc56a7c02bb6a17db908d419777e2`)
      .then(res=>
          this.setState({
            movies: res.data.results
          })
      );
  };

  getPopularMovies = () => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular?api_key=ad1dc56a7c02bb6a17db908d419777e2')
      .then(res=>
          this.setState({
            movies: res.data.results
          })
      );
  };

  componentDidMount(){
    this.getPopularMovies();
  }

  render(){
    return(
      <div>

        <div className="genre-bar">
          {Object.keys(this.genres).map(genre => (
            <button
              key = {genre}
              onClick = {e => this.updateGenres(e, genre)}
              className = "btn m-1 btn-info btn"
            >
              {genre}
            </button>
          ))}
        </div>
        
        <div className = "movies-container">
          {this.state.movies.map(movie => {
            return (
              <a 
               className='result-item' 
               key={movie.id} 
               href= {`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              >
                <h6 className="image-label">{movie.title}</h6>
                <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                />
             </a>
           )
          })}
        </div>
      </div>
      );
    }
  }

  export default Collection;


