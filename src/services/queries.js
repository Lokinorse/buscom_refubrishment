import axios from "axios";

export const queries = {
  getConstructorData: () => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getConstructorData",
        {
          params: {},
        }
      )
      .then((response) => {
        console.log("ALL CONSTRUCTOR DATA", response);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
  getStepFirstCat: (handleCardUpdate, catId, order) => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getCategoryData",
        {
          params: {
            category_id: catId,
          },
        }
      )
      .then((response) => {
        handleCardUpdate(order, "name", response.data.name);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
  getStepFirstProducts: (handleCardUpdate, catId, order) => {
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getProductsByCategoryId",
        {
          params: {
            category_id: catId,
          },
        }
      )
      .then((response) => {
        console.log("products", response.data);
        handleCardUpdate(order, "products", Object.values(response.data));
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
  },
};
