import { ITotalData } from "../types";

export type TActionId = "addProduct" | "removeProduct";
interface IAction {
  type: TActionId;
  payload: any;
}
export type TTotalDataReducer = (drft: ITotalData, actn: IAction) => void;

export const totalDataReducer: TTotalDataReducer = (draft, action) => {
  switch (action.type) {
    case "addProduct": {
      draft.products.push(action.payload);
      break;
    }
    case "removeProduct": {
      draft.products = draft.products.filter(
        (i) => i.product_id !== action.payload.product_id
      );
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
