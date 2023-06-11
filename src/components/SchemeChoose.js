import React from "react";

const schemeOptions = [
  {
    title: "14 мест",
    seats: 14,
    foldingSeats: 11,
    armrests: 9,
  },
  {
    title: "15 мест",
    seats: 15,
    foldingSeats: 12,
    armrests: 9,
  },
  {
    title: "15 мест, закрытый задний ряд",
    seats: 15,
    foldingSeats: 11,
    armrests: 7,
  },
  {
    title: "16 мест, закрытый задний ряд",
    seats: 16,
    foldingSeats: 12,
    armrests: 7,
  },
  { title: "17 мест", seats: 17, foldingSeats: 14, armrests: 11 },
  { title: "17 мест, три спереди", seats: 17, foldingSeats: 14, armrests: 10 },
  {
    title: "18 мест, закрытый задний ряд",
    seats: 18,
    foldingSeats: 14,
    armrests: 9,
  },
  {
    title: "18 мест, три спереди, закрытый задний ряд",
    seats: 18,
    foldingSeats: 14,
    armrests: 8,
  },
  {
    title: "Выбрать наполнение вручную",
    seats: 0,
    foldingSeats: 0,
    armrests: 0,
  },
];
export const SchemeChoose = ({ setScheme }) => {
  return (
    <div className="scheme_choose_wrapper">
      <div className="scheme_choose_title">Выберите схему салона</div>
      <div className="scheme_choose_options_wrapper">
        {schemeOptions.map((item) => {
          return <>{item.title}</>;
        })}
      </div>
    </div>
  );
};
