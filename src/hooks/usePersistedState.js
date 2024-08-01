import { useState } from "react";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      return JSON.parse(localStorageValue);
    }
    return defaultValue;
  });

  const setPersistedState = (value) => {
    setState(value);
    let serializedValue;
    if (typeof value === "function") {
      serializedValue = value(state);
    } else {
      serializedValue = value;
    }
    localStorage.setItem(key, JSON.stringify(serializedValue));
  };

  return [state, setPersistedState];
}
