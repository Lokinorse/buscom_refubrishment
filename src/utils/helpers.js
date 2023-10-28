import { each, find, map } from "lodash";
import { schemeOptions, getOptionSystemName } from "../components/SchemeChoose";
export const reduceNumberFromString = (price) => {
  if (typeof price === "number") return price;
  const numberString = price.replace(/\s/g, "");
  const number = parseInt(numberString);
  return number;
};

const findOptionById = (arr, optionId) => {
  for (const item of arr) {
    if (Array.isArray(item.products)) {
      for (const product of item.products) {
        if (Array.isArray(product.options)) {
          for (const option of product.options) {
            if (option.option_id == optionId) {
              return option;
            }
          }
        }
      }
    }
    if (Array.isArray(item.subcategories)) {
      const foundOption = findOptionById(item.subcategories, optionId);
      if (foundOption) {
        return foundOption;
      }
    }
  }
  return null;
};

const getAdditionalOptionsRaw = (inputString) => {
  const pattern = /ao(\d+)|ao_co(\d+)|ao_chsn_id(\d+)/g;
  const matches = inputString.match(pattern);

  const result = [];
  if (matches) {
    let currentId = null;
    let currentCount = null;
    let chosenOptionId = null;

    for (const match of matches) {
      const idMatch = match.match(/ao(\d+)/);
      const countMatch = match.match(/ao_co(\d+)/);
      const chosenOptionIdMatch = match.match(/ao_chsn_id(\d+)/);

      if (idMatch) {
        currentId = Number(idMatch[1]);
      } else if (countMatch) {
        currentCount = Number(countMatch[1]);
      } else if (chosenOptionIdMatch) {
        chosenOptionId = Number(chosenOptionIdMatch[1]);
      }

      if (
        currentId !== null &&
        currentCount !== null &&
        chosenOptionId !== null
      ) {
        result.push({ id: currentId, count: currentCount, chosenOptionId });
        currentId = null;
        currentCount = null;
        chosenOptionId = null;
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
    const { product_option_value, ...rest } = fullAdditionalOption;
    const chosenValue = find(product_option_value, {
      product_option_value_id: String(item.chosenOptionId),
    });
    acc[item.id] = {
      ...chosenValue,
      option_name: fullAdditionalOption.name,
      count: item.count,
    };
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

export const generateUrlLink = (totalData2, scheme) => {
  let configString = `?scheme_id=${scheme.id}`;
  let index = 0;
  for (const product of totalData2.products) {
    configString += `&pr_id=${product.product_id}`;
    if (product?.additional_options?.length) {
      for (const option of product?.additional_options) {
        configString += `ad_opt=${option.id}__ch_val=${option.chosenOptionValue.id}`;
      }
    }
    index++;
  }
  const domainName =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://bus-com.ru/";
  navigator.clipboard
    .writeText(domainName + configString)
    .then(() => alert("Ссылка скопирована!"));
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

function findStepInDeepArray(arr, productId, dispatch, openedCats = []) {
  if (!productId) return { product: null, openedCategories: [] };
  let openedCategories = [];
  let foundProduct = null;

  for (const item of arr) {
    let possiblyOpenedCats = [...openedCats, item.category_id];

    if (item?.products?.length) {
      for (const product of item.products) {
        if (product.product_id == productId) {
          foundProduct = product;
          openedCategories = [...openedCategories, ...possiblyOpenedCats];
          return { product: foundProduct, openedCategories };
        }
      }
    }

    if (item.subcategories) {
      const result = findStepInDeepArray(
        item.subcategories,
        productId,
        dispatch,
        possiblyOpenedCats
      );

      if (result.product) {
        foundProduct = result.product;
        return {
          product: foundProduct,
          openedCategories: [...openedCategories, ...result.openedCategories],
        };
      }
    }
  }

  return { product: foundProduct, openedCategories };
}

export const getIdAndOptions = (inputString, steps, scheme) => {
  const result = {};
  const options = [];

  const idMatch = inputString.match(/(\d+)/);
  if (idMatch) {
    result.id = idMatch[1];
  }

  const optionMatches = inputString.matchAll(/ad_opt=(\d+)__ch_val=(\d+)/g);
  for (const optionMatch of optionMatches) {
    const optionId = optionMatch[1];
    const chosenValue = optionMatch[2];
    const foundAdditionalOption = findOptionById(steps, optionId);
    const foundChosenOptionValue = find(
      foundAdditionalOption.product_option_value,
      { option_value_id: String(chosenValue) }
    );
    options.push({
      id: optionId,
      name: foundAdditionalOption.name,
      chosenOptionValue: {
        id: chosenValue,
        name: foundChosenOptionValue.name,
        price: parseInt(foundChosenOptionValue.price),
        count: scheme[getOptionSystemName(foundAdditionalOption.name)],
      },
    });
  }

  if (options.length > 0) {
    result.options = options;
  } else {
    result.options = []; // Set options to an empty array when no options are found.
  }

  return result;
};
export const hydrateState = ({
  params,
  dispatch,
  steps,
  setOpenedMenus,
  setScheme,
}) => {
  if (!Object.keys(params).length) return;
  const scheme = find(schemeOptions, { id: Number(params.scheme_id) });
  setScheme(scheme);
  let chosenSteps;
  if (!Array.isArray(params.pr_id)) {
    params.pr_id = [params.pr_id];
  }
  chosenSteps = map(params.pr_id, (value, key) => {
    const { id, options } = getIdAndOptions(value, steps, scheme);
    const step = findStepInDeepArray(steps, id, dispatch);
    if (!step.product) return;
    step.product["additional_options"] = options;
    return step;
  }).filter((i) => i);
  console.log("steps", chosenSteps);
  for (const chosenStep of chosenSteps) {
    if (chosenStep.product) {
      dispatch({
        type: "addProduct",
        payload: chosenStep.product,
      });
    }
  }
  const openedMenus = chosenSteps.reduce((acc, curr) => {
    return [...acc, ...curr.openedCategories];
  }, []);
  setOpenedMenus(openedMenus);
  //pr_id=507pr_id=252ad_opt=16__ch_val=53ad_opt=17__ch_val=59
  //const restoredProducts = getRestoredProducts(params)
  //dispatch({
  //  type: "addProduct",
  //  payload: productPayload,
  //});
};

/*   const schemeId = params.conf_s?.substr(0, 1);
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
    const stepAugmented = {
      [step.category_id]: {
        cat_name: step.name,
        selected_option: {
          product_id: id,
          count,
          name,
          price,
        },
      },
    };
    if (additional_options) {
      stepAugmented[step.category_id].additional_options = additional_options;
    }
    return stepAugmented;
  });
  const hydratedTotalData = convertArrayToObject(stepsToTotalData);
  setTotalData(hydratedTotalData); 
};*/

//http://localhost:3000/?conf_s=1__&89=so_co14so_pr_id249ao250_ao_co14ao251_ao_co9

// e.g:  3 500 руб. ==> 3500
export const getNumberPriceFromProductPrice = (stringPrice) => {
  const numericString = stringPrice.replace(/[^0-9]/g, "");
  const numericValue = parseInt(numericString, 10);
  return numericValue;
};
