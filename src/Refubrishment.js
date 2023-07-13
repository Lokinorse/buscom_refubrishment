import React, { useState, useEffect } from "react";
import { Step } from "./components/Step";
import { TotalWidget, SchemeChoose } from "./components";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";
import { useQueryParam } from "./utils/hooks";
import {
  concatSandTDStrings,
  getTotalDataQueryString,
  hydrateState,
} from "./utils/helpers";

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});
  const [urlConfig, setUrlConfig] = useState("");

  console.log("urlConfig", urlConfig);

  //const [queryParam, updateQueryParam] = useQueryParam("config", "");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    hydrateState(params, setTotalData, setScheme);
  }, []);

  useEffect(() => {
    if (!scheme) {
      setUrlConfig("");
      return;
    }
    setUrlConfig("?conf_s=" + scheme.id);
  }, [scheme]);
  useEffect(() => {
    setUrlConfig(
      concatSandTDStrings(urlConfig, getTotalDataQueryString(totalData))
    );
  }, [totalData]);

  const setSchemeHandler = (chosenScheme) => {
    setScheme(chosenScheme);
  };

  const resetSchemeHandler = () => {
    setScheme(null);
    setTotalData({});
  };
  return (
    <div className="container">
      <h1>Переоборудование 2.0</h1>
      {scheme ? (
        <div className="calculator_wrapper">
          <div className="calculator">
            {steps.map((step) => {
              return (
                <Step
                  step={step}
                  scheme={scheme}
                  key={step.category_id}
                  setTotalData={setTotalData}
                />
              );
            })}
          </div>
          <TotalWidget
            totalData={totalData}
            scheme={scheme}
            resetSchemeHandler={resetSchemeHandler}
            urlConfig={urlConfig}
          />
        </div>
      ) : (
        <SchemeChoose setScheme={setSchemeHandler} />
      )}
    </div>
  );
};
