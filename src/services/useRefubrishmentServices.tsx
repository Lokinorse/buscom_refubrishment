import React, { useState, useEffect } from "react";
import { queries } from "./queries";
import type { TSteps } from "../types";
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

export const useRefubrishmentQueries: () => { steps: TSteps } = () => {
  const [allConstructorData, setAllConstructorData] = useState<TSteps>([]);

  useEffect(() => {
    queries.getConstructorData(setAllConstructorData);
  }, []);

  return {
    steps: allConstructorData,
  };
};
