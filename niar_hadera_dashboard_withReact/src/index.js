import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import Login from './Login.js';

import registerServiceWorker from './registerServiceWorker';

import { Route, BrowserRouter as Router, Switch, HashRouter } from 'react-router-dom'



const routing = (
    
    <Router>

       
            <Switch>
                
                
                <Route path="/login" component={Login} />
                <Route component={App} />
                {/* <Route path="/users/:id" component={Users} />
                <Route path="/contact" component={Contact} />
                <Route component={Notfound} /> */}
            </Switch>

  
    </Router>
)

ReactDOM.render( routing , document.getElementById('root'));

registerServiceWorker();