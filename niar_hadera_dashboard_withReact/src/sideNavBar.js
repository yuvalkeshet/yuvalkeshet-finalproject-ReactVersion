import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import MessageModal from "./MessageModal";

class SideNavBar extends Component {


    render() {
        return (
            <SideNav style={{ top: '56px', position: 'fixed', background: '#50585b' }}
                onSelect={(selected) => {
                    switch (selected) {
                        case 'inbox': { this.props.history.push('/messages/inbox') }; break
                        case 'sent': { this.props.history.push('/messages/sent') }; break
                        case 'trash': { this.props.history.push('/messages/trash') };
                    }
                }}

                onToggle={(expanded) => {
                    if (expanded)
                        document.getElementById('modalBtn').style.display = 'block';
                    else
                        document.getElementById('modalBtn').style.display = 'none';
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="inbox">
                    <NavItem eventKey="inbox">
                        <NavIcon>
                            <i className="fa fa-fw fa-inbox" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Inbox
                    </NavText>
                    </NavItem>

                    <NavItem eventKey="sent">
                        <NavIcon>
                            <i className="fa fa-fw fa-paper-plane" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Sent
                    </NavText>
                    </NavItem>

                    <NavItem eventKey="trash">
                        <NavIcon>
                            <i className="fa fa-fw fa-trash" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Trash
                    </NavText>
                    </NavItem>
                    <hr></hr>
                    {/* <NavItem eventKey="write">
                        <NavIcon>
                            <i className="fa fa-fw fa-envelope" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Write Email
                    </NavText>
                    </NavItem> */}
                    <div id='modalBtn' style={{ display: 'none' }}>
                        <MessageModal />
                    </div>

                </SideNav.Nav>
            </SideNav>
        );
    }
}

export default SideNavBar;