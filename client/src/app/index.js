import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../pages/user/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutBlank from '../layouts/blank-layout';
import LayoutAdmin from '../layouts/admin-layout';
import ForgotPassword from '../pages/user/forgot-password';
import UpdatePassword from '../pages/user/update-password';

function App() {
    return (
        <Router>
            <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/forgot" exact component={ForgotPassword} /> 
            <Route path="/update-password" exact={true} component={UpdatePassword} /> 

            <Route path="/admin" component={LayoutAdmin} />
                <Route
                    path="/"
                    component={LayoutBlank}
                />
                
           
            </Switch>
            
        </Router>
    )
}

export default App
