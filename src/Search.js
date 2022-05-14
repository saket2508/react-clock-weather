import React, { useState } from "react";

function Search({ handleSelect }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="searchLayout">
      <div className="searchContainer">
        <span className="searchIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            height={16}
            width={16}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          className="searchBar"
          placeholder="Search any location"
          value={term}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Search;
