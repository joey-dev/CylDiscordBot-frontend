import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../../pages/Dashboard';


const PrivateRoute = [
    <Route path="/dashboard"
        element={<Dashboard />}
        key="dashboard"
    >
        <Route path=":serverId"
            element={<Dashboard />}
        >
            <Route path=":moduleId/:pluginId"
                element={<Dashboard />}
            />
        </Route>
    </Route>
];

export default PrivateRoute;
