import type { Session } from "./types";

export const initialState: Session = {
  permissions: [],
  fetching: true,
};

export const actionsType = {
  LOGIN: "login",
  FETCH: "fetch",
  LOGOUT: "logout",
  LOADING: "loading",
  ERROR: "error",
  DONE: "done",
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
        fetching: false,
      };
    case actionsType.LOGOUT:
      return {
        permissions: [],
      };
    case actionsType.ERROR:
      return {
        permissions: [],
        fetching: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error: action.payload,
      };
    case actionsType.DONE:
      return {
        permissions: [],
        fetching: false,
      };
    default:
      return state;
  }
};
