import React, { useState, useEffect, createContext, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { Step } from "./Step";
import { TotalWidget, SchemeChoose } from ".";
import { useRefubrishmentQueries } from "../services/useRefubrishmentServices";
import { hydrateState, generateUrlLink } from "../utils/helpers";
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
  const [openedMenus, setOpenedMenus] = useState([]);
  const [scheme, setScheme] = useState(null);
  const [totalData, setTotalData] = useState({});
  const [totalData2, dispatch] = useImmerReducer(
    totalDataReducer,
    reducerInitialState
  );
  const [urlConfig, setUrlConfig] = useState("");
  //const [queryParam, updateQueryParam] = useQueryParam("config", "");
  window["state"] = totalData2;
  window["config"] = urlConfig;

  useEffect(() => {
    if (!steps?.length) return;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = {};

    urlSearchParams.forEach((value, key) => {
      if (params[key] === undefined) {
        params[key] = value;
      } else {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key]];
        }
        params[key].push(value);
      }
    });
    hydrateState({ params, dispatch, steps, setOpenedMenus, setScheme });
  }, [steps]);

  /*   useEffect(() => {
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
  }, [totalData]); */

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
        <h1>Переоборудование</h1>
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
            <button
              className="url_link_btn"
              onClick={() => generateUrlLink(totalData2, scheme)}
            >
              Скопировать ссылку на конфигурацию
            </button>
          </div>
        )}
        <div className="tiles_wrapper">
          {scheme ? (
            steps.map((step) => {
              const isSeats = step.name === "Сиденья";
              return (
                <div key={step.category_id}>
                  {`ID: ${step.category_id}`}
                  <Step
                    openedMenus={openedMenus}
                    forceOpen={openedMenus.includes(step.category_id)}
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
