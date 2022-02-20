import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../../pages/Dashboard/Dashboard';


const PrivateRoute = [
    <Route path="/dashboard"
        element={<Dashboard loading={false} />}
        key="dashboard"
    >
        <Route path=":serverId"
            element={<Dashboard loading={false} />}
        >
            <Route path=":moduleId/:pluginId"
                element={<Dashboard loading={false} />}
            />
        </Route>
    </Route>
];

export default PrivateRoute;
