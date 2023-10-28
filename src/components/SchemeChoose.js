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
    img: "14.jpg",
  },
  {
    id: 2,
    title: "15 мест",
    seats: 15,
    foldingSeats: 12,
    armrests: 9,
    img: "15.jpg",
  },
  {
    id: 3,
    title: "15 мест, закрытый задний ряд",
    seats: 15,
    foldingSeats: 11,
    armrests: 7,
    img: "15_closed_row.jpg",
  },
  {
    id: 4,
    title: "16 мест, закрытый задний ряд",
    seats: 16,
    foldingSeats: 12,
    armrests: 7,
    img: "16_closed_row.jpg",
  },
  {
    id: 5,
    title: "17 мест",
    seats: 17,
    foldingSeats: 14,
    armrests: 11,
    img: "17.jpg",
  },
  {
    id: 6,
    title: "17 мест, три спереди",
    seats: 17,
    foldingSeats: 14,
    armrests: 10,
    img: "17_three_in_front.jpg",
  },
  {
    id: 7,
    title: "18 мест, закрытый задний ряд",
    seats: 18,
    foldingSeats: 14,
    armrests: 9,
    img: "18_closed_row.jpg",
  },
  {
    id: 8,
    title: "18 мест, три спереди, закрытый задний ряд",
    seats: 18,
    foldingSeats: 14,
    armrests: 8,
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
