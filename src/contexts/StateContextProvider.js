import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search1.p.rapidapi.com/google-search?hl=en&q=Avengers%2BEndgame&gl=us';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async () => {
    setLoading(true);

    const res = await fetch(`${baseUrl}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      },
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
