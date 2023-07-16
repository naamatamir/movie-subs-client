import { Route, Navigate } from 'react-router-dom';

const PermissionsRoute = ({
  permissionsRequired,
  permissions,
  element,
  ...rest
}) => {
  const hasPermissions = permissionsRequired.every((p) =>
    permissions.includes(p)
  );

  return (
    <Route
      {...rest}
      element={hasPermissions ? element : <Navigate to='/unauthorized' />}
    />
  );
};

export default PermissionsRoute;
