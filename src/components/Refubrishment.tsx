import React, { useState, useEffect, createContext, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { Step } from "./Step";
import { TotalWidget, SchemeChoose } from ".";
import { useRefubrishmentQueries } from "../services/useRefubrishmentServices";
import { hydrateState, generateUrlLink, getTotalPrice } from "../utils/helpers";
import { IAction, totalDataReducer } from "../services/totalDataReducer";
import { Loading } from "../ui-components/Loading";
import { ModalWindow } from "../ui-components/ModalWindow";
import { ContactButton } from "../components/ContactButton";
import { FeedbackForm } from "../components/FeedbackForm";
//TODO: Разрезолвить кейс, при котором ссылка копируется с изначально выставленным /?

export const reducerInitialState = {
  products: [],
  tempState: null,
};

export interface ITotalDataState {
  products: any[];
  tempState?: any;
  [key: string]: any;
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
  const [makeOrderModal, setMakeOrderModal] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState(null);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [openedMenus, setOpenedMenus] = useState([]);
  const [scheme, setScheme] = useState(null);
  const [totalData2, dispatch] = useImmerReducer(
    totalDataReducer,
    reducerInitialState
  );
  const totalPrice = getTotalPrice(totalData2);
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

  const setSchemeHandler = (chosenScheme) => {
    setScheme(chosenScheme);
  };

  const resetSchemeHandler = () => {
    setScheme(null);
    dispatch({
      type: "resetState",
      payload: null,
    });
    window.location.href =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://bus-com.ru/refubrishment";
    //setTotalData({});
  };

  const generateUrlHandler = () => {
    navigator.clipboard.writeText(generateUrlLink(totalData2, scheme));
    setShowCopyTooltip(true);
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    const timeout = setTimeout(() => setShowCopyTooltip(false), 3000);
    setTooltipTimeout(timeout);
  };
  useEffect(() => {
    return () => {
      if (tooltipTimeout) clearTimeout(tooltipTimeout);
    };
  }, [tooltipTimeout]);

  if (!steps?.length) return <Loading />;
  return (
    <TotalDataContext.Provider value={{ totalData2, dispatch, scheme }}>
      <div className="wrapper">
        <h1 className="main_title">Калькулятор переоборудования</h1>
        {scheme && (
          <div className="top_control_panel">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="scheme_info">
                Вы выбрали схему: <span className="test">{scheme.title}</span>
              </div>
            </div>
            <div
              className="top_control_panel_btns_wrapper"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <button
                onClick={resetSchemeHandler}
                className="refub_btn black_white_btn chg_scheme_btn"
              >
                Изменить схему
              </button>
              <ContactButton
                title="Заказать звонок"
                clickHandler={() => setMakeOrderModal(true)}
              />
            </div>
          </div>
        )}
        <div className="tiles_wrapper">
          {scheme ? (
            steps.map((step) => {
              const isSeats = step.name === "Сиденья";
              return (
                <div key={step.category_id}>
                  <Step
                    allParents={[step.category_id]}
                    forceOpen={openedMenus.includes(step.category_id)}
                    openedMenus={openedMenus}
                    key={step.category_id}
                    isSeats={isSeats}
                    step={step}
                  />
                </div>
              );
            })
          ) : (
            <SchemeChoose setScheme={setSchemeHandler} />
          )}
        </div>
        <div className="copy_btn_wrapper">
          <div className={`tooltip_container ${showCopyTooltip ? "show" : ""}`}>
            <div className="tooltip_content">
              <div className="tooltip_arrow"></div>
              Ссылка скопирована!
            </div>
          </div>
          {scheme && (
            <button className="url_link_btn" onClick={generateUrlHandler}>
              Скопировать ссылку на конфигурацию
            </button>
          )}
        </div>
        <div className="calc_footer">
          {scheme && <TotalWidget totalPrice={totalPrice} />}
          <ContactButton clickHandler={() => setMakeOrderModal(true)} />
        </div>
      </div>
      {makeOrderModal && (
        <ModalWindow
          title={"Заказать переоборудование"}
          onClose={() => {
            setMakeOrderModal(false);
          }}
        >
          <FeedbackForm
            onClose={() => {
              setMakeOrderModal(false);
            }}
            totalPrice={totalPrice}
            generateConfig={() => generateUrlLink(totalData2, scheme)}
          />
        </ModalWindow>
      )}
    </TotalDataContext.Provider>
  );
};
