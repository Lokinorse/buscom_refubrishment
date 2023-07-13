import { each, find } from "lodash";
import { schemeOptions } from "../components/SchemeChoose";
export const reduceNumberFromString = (price) => {
  if (typeof price === "number") return price;
  const numberString = price.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};

export const concatSandTDStrings = (oldString, newString) => {
  const parts = oldString.split("__");
  return parts[0] + "__" + newString;
};

export const getTotalDataQueryString = (totalData) => {
  let tdString = "";
  each(totalData, (value, key) => {
    tdString += "&" + key + "=";
    tdString += "so_co" + value.selected_option.count;
    tdString += "so_pr_id" + value.selected_option.product_id;
    if (value.additional_options) {
      each(
        value.additional_options,
        (additionalOptionValue, additionalOptionKey) => {
          if (additionalOptionValue.name === "Нет") return;
          tdString += `ao${additionalOptionKey}_ao_co${additionalOptionValue.count}`;
        }
      );
    }
  });
  return tdString;
};

export const hydrateState = (params, setTotalData, setScheme) => {
  const schemeId = params.conf_s?.substr(0, 1);
  if (schemeId) {
    const scheme = find(schemeOptions, { id: Number(schemeId) });
    if (scheme) setScheme(scheme);
  }
};
