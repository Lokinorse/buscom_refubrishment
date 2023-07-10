import { useState } from "react";

const getQuery = () => new URLSearchParams(window.location.search);

const getQueryStringVal = (key) => {
  return getQuery().get(key);
};

export const useQueryParam = (key, defaultVal) => {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

  const updateUrl = (newVal) => {
    setQuery(newVal);
    const query = getQuery();
    if (newVal.trim() !== "") {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }
  };
  const { protocol, pathname, host } = window.location;
  const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
  window.history.pushState({}, "", newUrl);

  return [query, updateUrl];
};
