import { createContext, useState } from "react";

export const ParkContext = createContext(null);

//this components is 100% useless now, I just keep it because I have to submit in a few minutes and dont want to break anything
export const ParkProvider = ({ children }) => {
  const [parks, setParks] = useState();

  return (
    <ParkContext.Provider value={{ parks, setParks }}>
      {children}
    </ParkContext.Provider>
  );
};
