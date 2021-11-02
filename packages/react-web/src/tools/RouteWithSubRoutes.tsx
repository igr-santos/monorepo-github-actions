import { Route } from "react-router";

export interface RouteProps {
  path: string;
  exact?: boolean;
  component: any;
  routes?: RouteProps[];
}

const RouteWithSubRoutes: React.FC<{ route: RouteProps }> = ({ route }) => {
  console.log("RouteWithSubRoutes", { route });
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

export default RouteWithSubRoutes;
