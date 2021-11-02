import type { Session } from "./types";

export const initialState: Session = {
  permissions: [],
};

export const actionsType = {
  LOGIN: "login",
  FETCH: "fetch",
  LOGOUT: "logout",
};

interface Action {
  type: string;
  payload?: any;
}

export type Reducer = (state: Session, action: Action) => Session;

export default (state = initialState, action?: Action) => {
  switch (action?.type) {
    case actionsType.LOGIN:
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        token: action.payload,
      };
    case actionsType.FETCH:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
        ...action.payload,
      };
    case actionsType.LOGOUT:
      return {
        permissions: [],
      };
    default:
      return state;
  }
};
