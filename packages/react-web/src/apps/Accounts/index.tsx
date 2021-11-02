import { Link } from "react-router-dom";

const AccountsApp: React.FC = () => (
  <div>
    <h2>Accounts</h2>
    <nav>
      <Link to="/accounts/login">Login</Link>
      <Link to="/accounts/register">Register</Link>
    </nav>
    {/* <Switch>
      {routes.map((route: RouteProps, i: number) => (
        <RouteWithSubRoutes key={i} route={route} />
      ))}
    </Switch> */}
  </div>
);

export default AccountsApp;

// export default {
//   path: "/accounts",
//   exact: true,
//   component: AccountsApp,
//   routes: [
//     {
//       path: "/accounts/login",
//       exact: true,
//       component: LoginScene,
//     },
//     {
//       path: "/accounts/register",
//       exact: true,
//       component: RegisterScene,
//     },
//   ],
// };
