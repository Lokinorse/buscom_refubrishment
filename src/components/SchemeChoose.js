import React from "react";
import { MenuItem } from "./MenuItem";

export const getOptionSystemName = (rusName) => {
  switch (rusName) {
    case "Опора":
      return "pillar";
    case "Ремень":
      return "belt";
    case "Подлокотник":
      return "armrests";
    case "Сетка на спинку":
      return "backNet";
    case "Столик на спинку":
      return "backTable";
    case "Материал":
      return "material";
    case "Подголовник на липучке":
      return "headrest";
    case "Откидная спинка":
      return "foldingSeats";
    default:
      //todo: убрать алерт на проде
      alert("Недобавленное имя опции!", rusName);
      return rusName;
  }
};

export const schemeOptions = [
  {
    id: 1,
    title: "14 мест",
    seats: 14,
    foldingSeats: 11,
    pillar: 14,
    armrests: 9,
    backNet: 14,
    backTable: 14,
    material: 14,
    headrest: 14,
    belt: 14,
  },
  {
    id: 2,
    title: "15 мест",
    seats: 15,
    foldingSeats: 12,
    pillar: 15,
    armrests: 9,
    backNet: 15,
    backTable: 15,
    material: 15,
    headrest: 15,
    belt: 15,
  },
  {
    id: 3,
    title: "15 мест, закрытый задний ряд",
    pillar: 15,
    seats: 15,
    foldingSeats: 11,
    armrests: 7,
    belt: 15,
    material: 15,
    backNet: 15,
    headrest: 15,
    backTable: 15,
  },
  {
    id: 4,
    seats: 16,
    title: "16 мест, закрытый задний ряд",
    pillar: 16,
    foldingSeats: 12,
    belt: 16,
    armrests: 7,
    backNet: 16,
    backTable: 16,
    material: 16,
    headrest: 16,
    img: "16_closed_row.jpg",
  },
  {
    id: 5,
    seats: 17,
    title: "17 мест",
    pillar: 17,
    foldingSeats: 14,
    belt: 17,
    armrests: 11,
    backNet: 17,
    backTable: 17,
    material: 17,
    headrest: 17,
    img: "17.jpg",
  },
  {
    id: 6,
    seats: 17,
    title: "17 мест, три спереди",
    pillar: 17,
    foldingSeats: 14,
    armrests: 10,
    belt: 17,
    backNet: 17,
    backTable: 17,
    material: 17,
    headrest: 17,
    img: "17_three_in_front.jpg",
  },
  {
    id: 7,
    seats: 18,
    title: "18 мест, закрытый задний ряд",
    pillar: 18,
    foldingSeats: 14,
    belt: 18,
    armrests: 9,
    backNet: 18,
    backTable: 18,
    material: 18,
    headrest: 18,
    img: "18_closed_row.jpg",
  },
  {
    id: 8,
    seats: 18,
    title: "18 мест, три спереди, закрытый задний ряд",
    pillar: 18,
    foldingSeats: 14,
    belt: 18,
    armrests: 8,
    backNet: 18,
    backTable: 18,
    material: 18,
    headrest: 18,
    img: "18_three_in_front_closed_row.jpg",
  },
];

const chooseManuallyOption = schemeOptions[schemeOptions.length - 1];
export const SchemeChoose = ({ setScheme }) => {
  return schemeOptions.map((item) => {
    return (
      <MenuItem
        key={item.id}
        onClick={() => setScheme(item)}
        title={item.title}
      />
    );
  });
};
