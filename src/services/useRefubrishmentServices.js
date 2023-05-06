import React, { useState, useEffect } from "react";
import { queries } from "./queries";
// podium: 90
// установка сидений: 91
// полки: 92
// электропривод: 93
// шторки: 94
// кондиционер: 95
// обшивка салона: 96
// люк 98
// стекла 99
// Мультимедиа: 100

// it is hardcode yet, but better option would be fetch this list as children of category 'uslugi' via endpoint

export const useRefubrishmentQueries = () => {
  const [allConstructorData, setAllConstructorData] = useState([]);

  useEffect(() => {
    queries.getConstructorData(setAllConstructorData);
  }, []);

  return {
    steps: allConstructorData,
  };
};
