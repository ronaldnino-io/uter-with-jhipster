import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vehicle from './vehicle';
import Driver from './driver';
import Trip from './trip';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/vehicle`} component={Vehicle} />
      <ErrorBoundaryRoute path={`${match.url}/driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}/trip`} component={Trip} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
