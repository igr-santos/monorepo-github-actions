import { ChakraProvider } from "@chakra-ui/react";
import { lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Loading, MenuApps } from "@/components";
import { customTheme, FontsLoader } from "@/components/base";
import { sessionContext, SessionProvider, SessionRoute } from "@/tools/session";

import * as graphqlQueries from "./graphql-queries";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const Accounts = lazy(() => import("./Accounts"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const Admin = lazy(() => import("./Admin"));

export default function Apps() {
  return (
    <Router>
      <ChakraProvider theme={customTheme}>
        <FontsLoader />
        <SessionProvider
          login={graphqlQueries.login}
          fetchSession={graphqlQueries.fetchSession}
        >
          <Suspense fallback={<Loading />}>
            <Switch>
              <SessionRoute path="/accounts" component={Accounts} />
              <SessionRoute
                permission="admin"
                path="/admin"
                component={Admin}
              />
            </Switch>
          </Suspense>
        </SessionProvider>
      </ChakraProvider>
    </Router>
  );
}
