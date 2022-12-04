import { useEffect, useState } from "react";
import ParkCard from "./ParkCard";
import styled from "styled-components";

const ExploreParks = () => {
  const [parks, setParks] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);

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

  useEffect(() => {
    fetch("/API/getAllParks")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setParks(data.message);
        }
      });
  }, []);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

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

  const handleClear = () => {
    setFilters([]);
  };
  const filterChecker = (arr, target) => target.every((v) => arr.includes(v));

  const filteredParks = [];
  if (parks) {
    for (const park of parks) {
      if (filterChecker(park.amenities, filters)) {
        // console.log("added", park);
        filteredParks.push(park);
      }
    }
  }

  console.log(filteredParks);

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
