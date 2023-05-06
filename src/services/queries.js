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
        setAllConstructorData(response.data.categories);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
};
