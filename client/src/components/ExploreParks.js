//imports the hooks from react
import { useEffect, useState } from "react";

import ParkCard from "./ParkCard";
import styled from "styled-components";
//this renders the explore parks components, the shows all the parks currently available on the app
//and lets the user filters them
const ExploreParks = () => {
  //declare the parks state
  const [parks, setParks] = useState();
  //declare the state to toggle the filters
  const [showFilter, setShowFilter] = useState(false);
  //declare the state to accept which filters are used
  const [filters, setFilters] = useState([]);

  //these are the actual filter options, will be changed in the future for something bigger.
  const filtersOptions = [
    "bench",
    "water fountain",
    "space for small dogs",
    "parkour",
    "poo bags",
    "6 feet fences",
    "double doors",
    "trees",
    "tables",
  ];
  //fetches all the parks
  useEffect(() => {
    fetch("/API/getAllParks")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setParks(data.message);
        }
      });
  }, []);

  //toggle filters section to be shown
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  //sets the filters state with the checked options
  const handleOptions = (e) => {
    if (e.target.checked) {
      setFilters([...filters, e.target.value]);
    }
    if (!e.target.checked) {
      let index = filters.indexOf(e.target.value);
      if (index !== -1) {
        setFilters([
          ...filters.slice(0, index),
          ...filters.slice(index, filters.length - 1),
        ]);
      }
    }
  };
  //removes the filters from the array, need to find a way to uncheck the input as well
  const handleClear = () => {
    setFilters([]);
  };
  //functions to check if the arr of the park as all the filters
  const filterChecker = (arr, target) => target.every((v) => arr.includes(v));

  //adds the park to the arr if it as all the filters
  const filteredParks = [];
  if (parks) {
    for (const park of parks) {
      if (filterChecker(park.amenities, filters)) {
        // console.log("added", park);
        filteredParks.push(park);
      }
    }
  }

  return (
    <div>
      <h1>Explore all our parks here! </h1>
      <button onClick={() => handleShowFilter()}>
        {showFilter ? "Hide filters" : "Add filters"}
      </button>
      {showFilter ? (
        <div>
          <div>
            {filtersOptions.map((option) => {
              return (
                <>
                  <input
                    type={"checkbox"}
                    name={option}
                    value={option}
                    onClick={(e) => handleOptions(e)}
                  />
                  <label htmlFor={option}>{option}</label>
                </>
              );
            })}
          </div>
          <button onClick={() => handleClear()}>Clear filters</button>
        </div>
      ) : null}
      <CardsWrapper>
        {filteredParks.length > 0 ? (
          filteredParks.map((park) => {
            return <ParkCard park={park} />;
          })
        ) : (
          <p>no parks correspond to your search :(</p>
        )}
      </CardsWrapper>
    </div>
  );
};

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ExploreParks;
