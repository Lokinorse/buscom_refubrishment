import React, { useContext } from "react";
import { IProductOption } from "../../types";
import { TotalDataContext } from "../Refubrishment";
import { AdditionalOptionValue } from "./AdditionalOptionValue";

/**
 * Блок с дополнительными опциями
 * @param param0
 */

export const AdditionalOptions = ({
  onClose,
  confirmHandler,
  disabled,
  options,
  productId,
}: {
  onClose: () => void;
  confirmHandler?: () => void;
  disabled?: boolean;
  productId: string;
  options: IProductOption[];
}) => {
  const { totalData2 } = useContext(TotalDataContext);
  if (!options.length) return null;
  return (
    <div className={`additional_options ${disabled ? "disabled" : ""}`}>
      {options.map((o) => {
        return (
          <AdditionalOptionValue
            cachedState={totalData2}
            disabled={disabled}
            key={o.option_id}
            productId={productId}
            option={o}
          />
        );
      })}
      {confirmHandler && (
        <div className="ad_options_btns_wrapper">
          <button
            className="refub_btn apply_btn"
            style={{
              background: "#0f8e49",
              justifySelf: "center",
              alignSelf: "center",
            }}
            onClick={confirmHandler}
          >
            Применить
          </button>
          <button className="refub_btn cancel_ad_options_btn" onClick={onClose}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
