import React, { useContext } from "react";
import { IProductOption } from "../../types";
import { TotalDataContext } from "../Refubrishment";
import { AdditionalOptionValue } from "./AdditionalOptionValue";

/**
 * Блок с дополнительными опциями
 * @param param0
 */

export const AdditionalOptions = ({
  confirmHandler,
  disabled,
  options,
  productId,
}: {
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
        <button
          className="refub_btn apply_btn"
          style={{
            marginTop: "36px",
            background: "#0f8e49",
            gridColumn: "1 / 3",
            justifySelf: "center",
            alignSelf: "center",
            lineHeight: "16px",
          }}
          onClick={confirmHandler}
        >
          Применить
        </button>
      )}
    </div>
  );
};
