import { gql, request } from "graphql-request";

import type { Session } from "@/tools/session";

export const login = async (
  email: string,
  pass: string
): Promise<{ token: string }> => {
  const loginQuery = gql`
    mutation ($email: String, $pass: String) {
      authenticate(email: $email, password: $pass) {
        token
      }
    }
  `;

  const { authenticate } = await request(
    import.meta.env.VITE_GRAPHQL_URL,
    loginQuery,
    {
      email,
      pass,
    }
  );
  return { token: authenticate.token };
};

export const fetchSession = async (token: string): Promise<Session> => {
  const currentUserQuery = gql`
    query {
      currentUser {
        id
        isAdmin
        admin
        firstName
        email
      }
    }
  `;

  const { currentUser } = await request(
    import.meta.env.VITE_GRAPHQL_URL,
    currentUserQuery,
    undefined,
    {
      authorization: `Bearer ${token}`,
    }
  );

  return {
    data: currentUser,
    token: token,
    permissions:
      currentUser.isAdmin && currentUser.admin ? ["admin", "user"] : ["user"],
  };
};
