import React, { Component } from "react";
import "./index.css";
import NavBar from "./navBar";
import Loading from "./Loading";
import Messages from "./Messages";
import Users from "./Users";
import User from "./User";
import KPIs from "./KPIs";
import { Route, BrowserRouter as Router, Switch, withRouter, browserHistory } from 'react-router-dom';
import { ToastContainer } from 'mdbreact';


class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (


      <React.Fragment>

        <NavBar />
        <div style={{ paddingTop: '75px', paddingBottom: '75px' }}>
          <Switch>
            <Route exact path="/" component={KPIs} />
            <Route path="/messages" component={Messages} />
            <Route path="/users" component={Users} />
            <Route path="/users/:email" component={User} />
          </Switch>
        </div>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
      </React.Fragment>


    );

  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1500));
}

export default App;
