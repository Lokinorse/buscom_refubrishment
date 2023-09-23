import React, { useState, useEffect } from "react";
import { Step } from "./components/Step";
import { TotalWidget, SchemeChoose } from "./components";
import { useRefubrishmentQueries } from "./services/useRefubrishmentServices";
import {
  concatSandTDStrings,
  getTotalDataQueryString,
  hydrateState,
} from "./utils/helpers";

//TODO: Разрезолвить кейс, при котором ссылка копируется с изначально выставленным /?

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  console.log("scjee", scheme);
  const [totalData, setTotalData] = useState({});
  console.log("totalData", totalData);
  const [urlConfig, setUrlConfig] = useState("");
  //const [queryParam, updateQueryParam] = useQueryParam("config", "");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    hydrateState(params, setTotalData, setScheme, steps);
  }, [steps]);

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
    <div className="wrapper">
      <h1>Переоборудование 2.0</h1>
      {scheme && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>Вы выбрали схему:</div>
            <div>&nbsp;</div>
            <div style={{ fontWeight: "bold" }}>{scheme.title}</div>
          </div>
          <button>privet</button>
        </div>
      )}
      <div className="tiles_wrapper">
        {scheme ? (
          steps.map((step) => {
            return (
              <Step
                step={step}
                scheme={scheme}
                key={step.category_id}
                setTotalData={setTotalData}
                totalData={totalData}
              />
            );
          })
        ) : (
          <SchemeChoose setScheme={setSchemeHandler} />
        )}
      </div>
    </div>
  );
};
