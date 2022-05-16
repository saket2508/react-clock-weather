import React, { useEffect, useState } from "react";
import { searchLocationAPI, countryList } from "./helper";

function Options({ items, handleClick }) {
  if (!items || items.length === 0) {
    return <div></div>;
  }
  return (
    <div className="optionsContainer">
      <ul>
        {items.map((item, id) => {
          if (item.state) {
            return (
              <li key={id} onClick={() => handleClick(item)}>
                {item.name}, {item.state}, {countryList[item.country]}
              </li>
            );
          }
          return (
            <li key={id} onClick={() => handleClick(item)}>
              {item.name}, {countryList[item.country]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Search({ selectCoordinates }) {
  const [isSearching, setIsSearching] = useState(false);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    if (!isSearching) {
      setIsSearching(true);
    }
    setTerm(e.target.value);
  };

  const handleClick = (item) => {
    setIsSearching(false);
    setTerm(item.name);
    let city;
    if(item.state){
      city = `${item.name}, ${item.state}, ${countryList[item.country]}`;
    } else {
      city = `${item.name}, ${countryList[item.country]}`;
    }
    selectCoordinates(item.lat, item.lon, city);
    setResults([]);
  };

  useEffect(() => {
    if (!isSearching) {
      return;
    }
    let timerId;
    function debounce() {
      clearTimeout(timerId);
      if (!term) {
        setResults([]);
        return;
      }
      timerId = setTimeout(async () => {
        try {
          const res = await searchLocationAPI(term);
          const options = [];
          for (let item of res) {
            const { name, state, lat, lon, country } = item;
            options.push({
              name,
              state,
              lat,
              lon,
              country,
            });
          }
          setResults(options);
        } catch (e) {
          // do something
        }
      }, 500);
    }
    debounce();

    return () => clearTimeout(timerId);
    // implement debouncing and call api only after a certain interval from when the user stops typing
  }, [term]);

  return (
    <div className="searchLayout">
      <div className="searchContainer">
        <input
          className="searchBar"
          placeholder="Search any location"
          value={term}
          onChange={handleChange}
        />
        <Options items={results} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default Search;
