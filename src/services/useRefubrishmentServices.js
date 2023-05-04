import React, { useState, useEffect } from "react";
import { queries } from "./queries";
const initialSteps = [
  {
    order: 1,
    systemName: "podium",
    name: "",
    products: [],
  },
  {
    order: 2,
    name: "",
    products: [],
  },
  {
    order: 3,
    name: "",
    products: [],
  },
];

export const useRefubrishmentQueries = () => {
  const [steps, setSteps] = useState(initialSteps);
  console.log("steps", steps);
  const handleCardUpdate = (order, changedProperty, value) => {
    setSteps((prevData) => {
      const updatedData = [...prevData];
      const cardIndex = updatedData.findIndex((card) => card.order === order);
      if (cardIndex !== -1) {
        const updatedCard = { ...updatedData[cardIndex] };
        updatedCard[changedProperty] = value;
        updatedData[cardIndex] = updatedCard;
      }
      return updatedData;
    });
  };

  useEffect(() => {
    queries.getStepFirstCat(handleCardUpdate);
    queries.getStepFirstProducts(handleCardUpdate);
  }, []);

  return {
    steps,
  };
};
