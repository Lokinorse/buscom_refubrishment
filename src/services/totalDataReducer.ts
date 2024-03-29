import { ITotalData } from "../types";
import { current } from "immer";
import { cloneDeep } from "lodash";
import { reducerInitialState } from "../components/Refubrishment";
export type TActionId =
  | "addProduct"
  | "removeProduct"
  | "restoreFrozenState"
  | "forgetFrozenState"
  | "rewriteWholeState"
  | "resetState"
  | "toggleAdditionalOptionCheckbox";
export interface IAction {
  type: TActionId;
  payload: any;
}
export type TTotalDataReducer = (drft: ITotalData, actn: IAction) => void;

export const totalDataReducer: TTotalDataReducer = (draft, action) => {
  switch (action.type) {
    case "rewriteWholeState": {
      return action.payload;
    }

    case "resetState": {
      return reducerInitialState;
    }

    case "addProduct": {
      const { isUniqueForCategory, parentCat, ...product } = action.payload;
      const idExists = draft.products.some(
        (item) => item.product_id === product.product_id
      );
      if (!idExists) {
        if (isUniqueForCategory) {
          draft.products = draft.products.filter(
            (p) => p.parentCat !== parentCat
          );
        }
        draft.products.push({ ...product, parentCat });
      }
      break;
    }
    case "removeProduct": {
      draft.products = draft.products.filter(
        (i) => i.product_id !== action.payload.product_id
      );
      break;
    }

    case "forgetFrozenState": {
      draft.tempState = null;
      break;
    }

    case "restoreFrozenState": {
      if (draft.tempState) return { ...draft.tempState, tempState: null };
      return draft;
    }
    case "toggleAdditionalOptionCheckbox": {
      const { productId, chosenOption, chosenOptionValue, shouldFreeze } =
        action.payload;
      if (shouldFreeze && !draft.tempState) {
        const draftClone = cloneDeep(draft);
        const { tempState, ...newTempState } = draftClone;
        draft.tempState = { ...newTempState };
      }
      const targetProduct = draft.products.find(
        (product) => product.product_id === productId
      );
      if (!targetProduct.additional_options) {
        targetProduct.additional_options = [];
        targetProduct.additional_options.push({
          id: chosenOption.id,
          name: chosenOption.name,
          chosenOptionValue: chosenOptionValue,
        });
      } else {
        const targetAdditionalOption = targetProduct.additional_options.find(
          (o) => o.id === chosenOption.id
        );
        if (targetAdditionalOption) {
          targetAdditionalOption.chosenOptionValue = chosenOptionValue;
        } else {
          targetProduct.additional_options.push({
            id: chosenOption.id,
            name: chosenOption.name,
            chosenOptionValue: chosenOptionValue,
          });
        }
      }
      break;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
