import axios from "axios";

export const queries = {
  getStepFirstCat: (handleCardUpdate) => {
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
        handleCardUpdate(1, "name", response.data.name);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
  getStepFirstProducts: (handleCardUpdate) => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getProductsByCategoryId",
        {
          params: {
            category_id: 90,
          },
        }
      )
      .then((response) => {
        console.log("products", response.data);
        handleCardUpdate(1, "products", Object.values(response.data));
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
};
