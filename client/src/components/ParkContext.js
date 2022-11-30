import { createContext, useState } from "react";

export const ParkContext = createContext(null);

export const ParkProvider = ({ children }) => {
  const [parks, setParks] = useState([]);

  return (
    <ParkContext.Provider value={{ parks, setParks }}>
      {children}
    </ParkContext.Provider>
  );
};
