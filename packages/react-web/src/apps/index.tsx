import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { Loading } from "@/components";
import { SessionProvider } from "@/tools/session";

import { fetchSession, login } from "./graphql-queries";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const Accounts = lazy(() => import("./Accounts"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const Admin = lazy(() => import("./Admin"));

export default function Apps() {
  return (
    <SessionProvider login={login} fetchSession={fetchSession}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/accounts">Accounts</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>

          <hr />

          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/accounts" component={Accounts} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </SessionProvider>
  );
}
