import React, { Component } from "react";
import { toast } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBCard } from "mdbreact";
import "./index.css";

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };


    }


    componentDidMount() {

        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/employees/registered')

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                this.setState({ users: data });

            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });






    }


    render() {
        if (this.state.users != null && this.state.users.length > 0) {
            return (



                <MDBContainer style={{ padding: '0px' }}>
                    <MDBCard>
                        <MDBListGroup id='usersList'>
                            {
                                this.state.users.map((user) => {
                                    return <MDBListGroupItem href={"/user/" + user.Email}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1">{user.Fname + ' ' + user.Lname}</h6>

                                        </div>
                                        <p className="mb-1">{user.Position}</p>
                                        <small>{user.Department}</small>
                                    </MDBListGroupItem>
                                })
                            }
                        </MDBListGroup>
                    </MDBCard>
                   
                </MDBContainer>


            );
        }

        return (
            <MDBContainer style={{ padding: '0px' }}>
                <MDBCard>
                    <MDBListGroup id='usersList'>
                    </MDBListGroup>
                </MDBCard>
              
            </MDBContainer>

        );

    }
}

export default Users;