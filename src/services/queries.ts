import axios from "axios";
import type { TSteps } from "../types";

export const queries = {
  getConstructorData: (setAllConstructorData) => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getConstructorData",
        {
          params: {},
        }
      )
      .then((response) => {
        if (!response.data.categories) return;
        setAllConstructorData(
          response.data.categories.sort((prev, curr) => {
            return prev.sort_order - curr.sort_order;
          }) as TSteps
        );
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
};
