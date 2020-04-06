import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import '../style/Search.css';

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      query: "",
      placeholder: "Search Movie",
      sortValue: "popularity",
      sortOrder: "desc"
    };
  }

  updateSortOrder (e, sortOrder){
    this.setState({
      sortOrder 
    });
    this.getMoviesByQuery();
  }

  updateSortValue(e, sortValue){
    this.setState({
      sortValue
    });
    this.getMoviesByQuery();
  }

  updateQuery(e, query){
    this.setState({
      query
    });
    this.getMoviesByQuery();
  }

  getMoviesByQuery = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.state.query}&api_key=ad1dc56a7c02bb6a17db908d419777e2`)
    .then(res=>
      this.setState({
        movies: res.data.results.sort(
          function(a,b){
            if(this.state.sortValue === "popularity"){
              return this.state.sortOrder === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity;
            }else{
              return this.state.sortOrder === "asc" ? new Date(a.release_data) - new Date(b.release_date) : new Date(b.release_date) - new Date(a.release_date);
            }
          }.bind(this)
        )
      })
  );
};

render() {
  return (
    <div className = "search-container">
    <div className = "search-block">
    <div className = "labels">
      <label>
        <select
          value = {this.state.sortValue}
          onChange = {e => this.updateSortValue(e,e.target.value)}
        >
        <option value = "popularity">Popular</option>
        <option value = "release_date">Release Date</option>
        </select>
      </label>

      <label>
        <select
          value = {this.state.sortOrder}
          onChange = {e => this.updateSortOrder(e, e.target.value)}
        >
          <option value="desc"> - </option>
          <option value="asc"> + </option>
        </select>
      </label>
    </div>


      <input
        type = "text"
        value = {this.state.query}
        onChange = {e => this.updateQuery(e, e.target.value)}
        placeholder = {this.state.placeholder}
        className = "search-bar"
      />
    </div>

    <div>
      {this.state.movies.map(movie =>{
        return(
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

export default Search;
