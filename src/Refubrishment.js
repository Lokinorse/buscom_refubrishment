import React, { useEffect } from "react";
import axios from "axios";

export const Refubrishment = () => {
  useEffect(() => {
    // Fetch category data using Axios
    axios
      .get(
        "https://www.bus-com.ru/index.php?route=information/refubrishment/getCategoryData",
        {
          params: {
            category_id: 42, // Replace with the actual category ID
          },
        }
      )
      .then((response) => {
        // Process the data returned from the server
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors, if any
        console.error("Error: " + error.message);
      });
  }, []);

  // Render your component UI
  return <h1>Переоборудование QUERY!!</h1>;
};
