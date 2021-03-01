import { useEffect, useState } from 'react';

const getSavedData = (key, initialdata) => {
  const savedData = JSON.parse(localStorage.getItem(key));
  return savedData ? savedData : initialdata;
};

export const useLocalStorage = (key, initialdata) => {
  const [data, setData] = useState(() => {
    return getSavedData(key, initialdata);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};
