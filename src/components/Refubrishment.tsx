import React, { useState, useEffect, createContext, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { Step } from "./Step";
import { TotalWidget, SchemeChoose } from ".";
import { useRefubrishmentQueries } from "../services/useRefubrishmentServices";
import {
  concatSandTDStrings,
  getTotalDataQueryString,
  hydrateState,
} from "../utils/helpers";
import type { ITotalData } from "../types";
import { IAction, totalDataReducer } from "../services/totalDataReducer";

//TODO: Разрезолвить кейс, при котором ссылка копируется с изначально выставленным /?

const reducerInitialState = {
  products: [],
  tempState: null,
};

export interface ITotalDataState {
  products: any[];
  tempState?: any;
  [key: string]: any | undefined;
}

interface ContextType {
  totalData2: ITotalDataState;
  dispatch: Dispatch<IAction>;
  scheme: any;
}

export const TotalDataContext = createContext<ContextType | undefined>(
  undefined
);

export const Refubrishment = () => {
  const { steps } = useRefubrishmentQueries();
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});
  const [totalData2, dispatch] = useImmerReducer(
    totalDataReducer,
    reducerInitialState
  );
  window["state"] = totalData2;
  //console.log("reducer", totalData2);
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
    <TotalDataContext.Provider value={{ totalData2, dispatch, scheme }}>
      <div className="wrapper">
        <h1>Переоборудование 2.0</h1>
        {scheme && <TotalWidget totalData={totalData} urlConfig={urlConfig} />}
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
              const isSeats = step.name === "Сиденья";
              return (
                <div key={step.category_id}>
                  <Step
                    isSeats={isSeats}
                    step={step}
                    key={step.category_id}
                    setTotalData={setTotalData}
                    totalData={totalData}
                  />
                </div>
              );
            })
          ) : (
            <SchemeChoose setScheme={setSchemeHandler} />
          )}
        </div>
      </div>
    </TotalDataContext.Provider>
  );
};
