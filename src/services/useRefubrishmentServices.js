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
const stepsCategoriesIds = [90, 91, 92, 93, 94, 95, 96, 98, 99, 100];

const initialSteps = [
  {
    order: 0,
    systemName: "Подиум sys",
    name: "",
    products: [],
    catId: stepsCategoriesIds[0],
  },
  {
    order: 1,
    systemName: "Установка сидений sys",
    name: "",
    products: [],
    catId: stepsCategoriesIds[1],
  },
  {
    order: 2,
    systemName: "Полки sys",
    name: "",
    products: [],
    catId: stepsCategoriesIds[2],
  },
  {
    order: 3,
    systemName: "электропривод sys",
    name: "",
    products: [],
    catId: stepsCategoriesIds[3],
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
    stepsCategoriesIds.forEach((id, index) => {
      queries.getStepFirstCat(handleCardUpdate, id, index);
      queries.getStepFirstProducts(handleCardUpdate, id, index);
    });
    queries.getConstructorData();
  }, []);

  return {
    steps,
  };
};
