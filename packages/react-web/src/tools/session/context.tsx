import { createContext, useEffect, useReducer } from "react";
import { useLocation, useHistory } from "react-router-dom";

import type { Reducer } from "./reducer";
import reducer, { actionsType, initialState } from "./reducer";
import type { Session } from "./types";

export interface ISessionContext {
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  session?: Session;
  hasPerms: (perms: string) => boolean;
  isAuthenticated: () => boolean;
}

export const sessionContext = createContext<ISessionContext | null>(null);

export interface SessionProviderProps {
  login: (email: string, pass: string) => Promise<{ token: string }>;
  fetchSession: (token: string) => Promise<Session>;
  fetchingComponent?: any;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  login,
  fetchSession,
  fetchingComponent: FetchingComponent = <span>{`iniciando sessão...`}</span>,
}) => {
  // eslint-disable-next-line
  const [session, dispatch] = useReducer<Reducer>(reducer, initialState);
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    try {
      const sessiondb = JSON.parse(localStorage.getItem("session"));
      if (sessiondb?.token) {
        // dispatch({ type: actionsType.LOADING })
        fetchSession(sessiondb.token).then(({ token, data, permissions }) => {
          // eslint-disable-next-line
          dispatch({ type: actionsType.LOGIN, payload: token });
          // eslint-disable-next-line
          dispatch({ type: actionsType.FETCH, payload: { data, permissions } });
        });
        return;
      }
      dispatch({ type: actionsType.FETCH, payload: {} });
    } catch (err) {
      console.error(err);
      dispatch({ type: actionsType.ERROR, payload: err });
    }
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    dispatch({ type: actionsType.LOADING });
    // eslint-disable-next-line
    const logged = await login(email, pass);
    // eslint-disable-next-line
    const { token, data, permissions } = await fetchSession(logged.token);
    // Save on storage
    localStorage.setItem(
      "session",
      JSON.stringify({ token, data, permissions })
    );
    // eslint-disable-next-line
    dispatch({ type: actionsType.LOGIN, payload: token });
    // eslint-disable-next-line
    dispatch({ type: actionsType.FETCH, payload: { data, permissions } });

    if (query.get("next")) {
      history.push(query.get("next"));
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("session");
    // eslint-disable-next-line
    dispatch({ type: actionsType.LOGOUT });
  };

  const hasPerms = (perms: string) =>
    session?.permissions?.findIndex((p: string) => p === perms) !== -1;

  return session.fetching ? (
    FetchingComponent
  ) : (
    <sessionContext.Provider
      value={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        session,
        hasPerms,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        isAuthenticated: () => !!session?.token,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};
