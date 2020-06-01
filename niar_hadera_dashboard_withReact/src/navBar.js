import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";

import { Link, BrowserRouter as Router, withRouter } from 'react-router-dom'


class NavBar extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const bgColor = { backgroundColor: '#82b1ff' }
        return (
            <MDBNavbar color="light-blue" dark expand="md" scrolling fixed="top">
                <MDBNavbarBrand style={{ paddingTop: '3px' }}>
                    <img src='http://en.hadera-paper.co.il/skin/frontend/repaper/mobile_english/images/logo-home-en.png' height='30px'></img>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                
                            <MDBNavItem active>
                                <Link to="/" className='nav-link waves-effect waves-light'>Home</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to="/profile" className='nav-link waves-effect waves-light'>Profile</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to="/messages" className='nav-link waves-effect waves-light'>Messages</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to="/users" className='nav-link waves-effect waves-light'>Users</Link>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link to="/login" className='nav-link waves-effect waves-light'>Log Out</Link>
                            </MDBNavItem>
                    
                        {/* <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <span className="mr-2">Dropdown</span>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu>
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem> */}
                    </MDBNavbarNav>
                    {/* <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav> */}
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <Link to="https://www.facebook.com/pages/%D7%97%D7%93%D7%A8%D7%94-%D7%9E%D7%A4%D7%A2%D7%9C%D7%99-%D7%A0%D7%99%D7%99%D7%A8/214560358576907" target="_blank" class="nav-link waves-effect waves-light"><MDBIcon fab icon="facebook-f" /></Link>
                        </MDBNavItem>
                        {/* <MDBNavItem>
                            <Link to="#" class="nav-link waves-effect waves-light"><MDBIcon fab icon="twitter" /></Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link to="#" class="nav-link waves-effect waves-light"><MDBIcon fab icon="instagram" /></Link>
                        </MDBNavItem> */}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default withRouter(NavBar);