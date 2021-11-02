import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { sessionContext } from "./context";

interface SessionRouteProps {
  permission?: string;
}

const NotFound = () => <h2>Permissão negada nessa página</h2>;

const SessionRoute: React.FC<SessionRouteProps> = ({
  permission,
  ...props
}) => {
  const { isAuthenticated, hasPerms } = useContext(sessionContext);

  console.log("permission, props", { permission, props });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!!permission && !isAuthenticated())
    return <Redirect to={`/accounts/login?next=${props.path}`} />;
  else if (!!permission && !hasPerms(permission))
    return <Route {...props} component={NotFound} />;

  return <Route {...props} />;
};

export default SessionRoute;
