import React, { Component, PureComponent } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import SideNavBar from "./sideNavBar"
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Message from "./Message";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Trash from "./Trash";
import MessageModal from "./MessageModal";

class Messages extends PureComponent {



    render() {
        return (
            <div style={{ paddingLeft: '64px' }}>
                <SideNavBar history={this.props.history} />
                <Switch>
                    <Route path="/messages/inbox/:msgId" component={Message} />
                    <Route path="/messages/sent/:msgId/:to" component={Message} />
                    <Route path="/messages/trash/:msgId/:to" component={Message} />
                    <Route path="/messages/inbox" component={Inbox} />
                    <Route path="/messages/sent" component={Sent} />
                    <Route path="/messages/trash" component={Trash} />
                </Switch>
            </div>


        );
    }
}

export default Messages;