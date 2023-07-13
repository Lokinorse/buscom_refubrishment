import React from "react";
export const schemeOptions = [
  {
    id: 1,
    title: "14 мест",
    seats: 14,
    foldingSeats: 11,
    armrests: 9,
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
  {
    id: 9,
    title: "Выбрать наполнение вручную",
    seats: 0,
    foldingSeats: 0,
    armrests: 0,
    img: "none.jpg",
  },
];
export const SchemeChoose = ({ setScheme }) => {
  return (
    <div className="scheme_choose_wrapper">
      <div className="scheme_choose_title">Выберите схему салона</div>
      <div className="scheme_choose_options_wrapper">
        {schemeOptions.map((item) => {
          return (
            <div
              className="scheme_choose_option"
              onClick={() => setScheme(item)}
            >
              <div className="scheme_choose_option_title">{item.title}</div>
              <div
                className="scheme_choose_option_img"
                style={{
                  height: "150px",
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${require(`../assets/img/${item.img}`)})`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
