import { useEffect, useState } from "react";

//this custom hook is used to store a value in session state, use it if it exists, creates it if it doesnt, updates is if it changes.

const usePersistedState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    const storedValue = window.sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

export default usePersistedState;
