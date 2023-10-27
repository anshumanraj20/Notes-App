// Search.js
import React from 'react';
import "./search.css";
import { AiOutlineSearch } from 'react-icons/ai';

const Search = ({ handleSearchNote }) => {

  return (
    <div className="search">
      <AiOutlineSearch className="search-icons" size="1.3em" />
        <input onChange={(event)=>
          handleSearchNote(event.target.value)
        }
          type="text" placeholder="type to search"></input>
       </div>
       );
}

export default Search;
