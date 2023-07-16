import { each, find, map } from "lodash";
import { schemeOptions } from "../components/SchemeChoose";
export const reduceNumberFromString = (price) => {
  if (typeof price === "number") return price;
  const numberString = price.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};

const getAdditionalOptionsRaw = (inputString) => {
  //const pattern = /ao(\d+)|ao_co(\d+)/g;
  const pattern = /ao(\d+)|ao_co(\d+)/g;
  const matches = inputString.match(pattern);

  const result = [];

  if (matches) {
    let currentId = null;
    let currentCount = null;

    for (const match of matches) {
      const idMatch = match.match(/ao(\d+)/);
      const countMatch = match.match(/ao_co(\d+)/);
      const chosenValueMatch = match.m;

      if (idMatch) {
        currentId = Number(idMatch[1]);
      } else if (countMatch) {
        currentCount = Number(countMatch[1]);
      }

      if (currentId !== null && currentCount !== null) {
        result.push({ id: currentId, count: currentCount });
        currentId = null;
        currentCount = null;
      }
    }
  }

  return result;
};

const getAdditionalOptions = (step, productId) => {
  const queryString = step.stepOptions;
  const additionalOptionsRaw = getAdditionalOptionsRaw(queryString);
  if (!additionalOptionsRaw.length) return;
  const currentProduct = find(step.products, { product_id: String(productId) });
  return additionalOptionsRaw.reduce((acc, item) => {
    const fullAdditionalOption = find(currentProduct?.options, {
      product_option_id: String(item.id),
    });
    acc[item.id] = { ...fullAdditionalOption, count: item.count };
    return acc;
  }, {});
};

const getSelectedOptionFromQueryParams = (step) => {
  const queryString = step.stepOptions;
  const countPattern = /so_co(\d+)/;
  const idPattern = /so_pr_id(\d+)/;
  const countMatch = queryString.match(countPattern);
  const idMatch = queryString.match(idPattern);
  const result = {};
  if (countMatch && countMatch[1]) {
    result.count = Number(countMatch[1]);
  }
  if (idMatch && idMatch[1]) {
    const id = Number(idMatch[1]);
    result.id = id;
    const selectedOption = find(step.products, { product_id: String(id) });
    if (selectedOption) {
      result.name = selectedOption.name;
      result.price = selectedOption.price;
    }
  }
  const additionalOptions = getAdditionalOptions(step, result.id);
  if (additionalOptions) result.additional_options = additionalOptions;
  return result;
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
          tdString += `ao${additionalOptionKey}_ao_co${additionalOptionValue.count}_ao_chsn_id${additionalOptionValue.product_option_value_id}`;
        }
      );
    }
  });
  return tdString;
};

export const clearQueryParams = () => {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState(null, "", url.toString());
};

const convertArrayToObject = (array) => {
  return array.reduce((result, item) => {
    const keys = Object.keys(item);
    keys.forEach((key) => {
      if (!result[key]) {
        result[key] = {};
      }
      result[key] = item[key];
    });
    return result;
  }, {});
};

export const hydrateState = (params, setTotalData, setScheme, steps) => {
  const schemeId = params.conf_s?.substr(0, 1);
  if (schemeId) {
    const scheme = find(schemeOptions, { id: Number(schemeId) });
    if (scheme) setScheme(scheme);
  }
  const chosenSteps = map(params, (value, key) => {
    const step = find(steps, { category_id: String(key) });
    if (!step) return undefined;
    return { ...step, stepOptions: value };
  }).filter((item) => item);

  const stepsToTotalData = chosenSteps.map((step) => {
    const { id, count, name, price, additional_options } =
      getSelectedOptionFromQueryParams(step);

    return {
      [step.category_id]: {
        cat_name: step.name,
        additional_options,
        selected_option: {
          product_id: id,
          count,
          name,
          price,
        },
      },
    };
  });
  const hydratedTotalData = convertArrayToObject(stepsToTotalData);
  setTotalData(hydratedTotalData);
};

//http://localhost:3000/?conf_s=1__&89=so_co14so_pr_id249ao250_ao_co14ao251_ao_co9
