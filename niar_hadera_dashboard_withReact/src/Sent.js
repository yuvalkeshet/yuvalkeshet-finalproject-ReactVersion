import React, { Component, PureComponent } from 'react';
import { toast } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBCard } from "mdbreact";
import Moment from 'react-moment';
import EllipsisText from "react-ellipsis-text";


import "./index.css";

class Sent extends Component {

    state = {
        messages: null,
    }

    componentDidMount() {
        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';
        //console.log(JSON.parse(localStorage['userData']).Email);
        fetch(domain + 'api/messages?email=' + JSON.parse(localStorage['userData']).Email + "&receivedOrSent=" + false)

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                this.setState({ messages: data });
                console.log(this.state.messages);




            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });


    }


    render() {
        console.log(String(this.props.match.params.msgId));
        //console.log(this.props);
        const dateStyle = { position: 'absolute', top: '.75rem', right: '1.25rem' }

        if (this.state.messages != null && this.state.messages.length > 0) {
            return (
                <MDBContainer style={{ padding: '0px' }}>
                    <h5 style={{ padding: '1.25rem' }}>Sent</h5>
                    <MDBCard>
                        <MDBListGroup id='messages'>
                            {
                                this.state.messages.map((msg) => {
                                    return <MDBListGroupItem href={"/messages/sent/" + msg.MessageCode + "/" + msg.ToUser} style={{ color: "#000" }}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h6 className="mb-1"><EllipsisText text={msg.ToUser} length={"15"} /></h6>

                                        </div>
                                        <EllipsisText text={msg.Title} length={"20"} /><br></br>
                                        <EllipsisText text={msg.Content} length={"7"} style={{ color: '#a2a2a2' }} />
                                        <small style={dateStyle}><Moment format="YYYY.MM.DD">{msg.MessageDate}</Moment></small>
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
                    <MDBListGroup id='messages'>
                    </MDBListGroup>
                </MDBCard>
               
            </MDBContainer>

        );
    }
}

export default Sent;