import React, { useEffect } from "react";
import axios from "axios";

export const Refubrishment = () => {
  useEffect(() => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getCategoryData",
        {
          params: {
            category_id: 90,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  }, []);

  return <h1>Переоборудование QUERY!!!</h1>;
};
