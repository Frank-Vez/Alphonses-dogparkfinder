import { useContext } from "react";
import ParkCard from "./ParkCard";
import { ParkContext } from "./ParkContext";

const ExploreParks = () => {
  const { parks } = useContext(ParkContext);

  if (parks) {
    console.log(parks);
  }

  return (
    <div>
      <h1>Explore all our parks here! </h1>
      {parks
        ? parks.map((park) => {
            return <ParkCard park={park} />;
          })
        : null}
    </div>
  );
};

export default ExploreParks;
