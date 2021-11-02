import { createContext, useReducer } from "react";

import type { Reducer } from "./reducer";
import reducer, { actionsType, initialState } from "./reducer";
import type { Session } from "./types";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  login,
  fetchSession,
}) => {
  // eslint-disable-next-line
  const [session, dispatch] = useReducer<Reducer>(reducer, initialState);

  const handleLogin = async (email: string, pass: string) => {
    // eslint-disable-next-line
    const logged = await login(email, pass);
    // eslint-disable-next-line
    const { token, data, permissions } = await fetchSession(logged.token);
    // eslint-disable-next-line
    dispatch({ type: actionsType.LOGIN, payload: token });
    // eslint-disable-next-line
    dispatch({ type: actionsType.FETCH, payload: { data, permissions } });
  };

  const handleLogout = async () => {
    await delay(3000);
    // eslint-disable-next-line
    dispatch({ type: actionsType.LOGOUT });
  };

  const hasPerms = (perms: string) =>
    session?.permissions?.findIndex((p: string) => p === perms) !== -1;

  return (
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
