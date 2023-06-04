import axios from "axios";

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
          })
        );
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
};
