import React, { Component } from "react";
import { ToastContainer, toast } from 'mdbreact';

class Message extends Component {

    state = {
        messageData: null,
        employeeData: null,
    }

    componentDidMount() {
        let domain, apiUrl;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';
        //console.log(JSON.parse(localStorage['userData']).Email);

        let currPath = this.props.location.pathname;
        //console.log(currPath.search(/sent/));
        if (currPath.search(/inbox/) != -1)
            apiUrl = domain + 'api/message?email=' + JSON.parse(localStorage['userData']).Email + "&msgCode=" + this.props.match.params.msgId;
        else if (currPath.search(/sent/) != -1 || currPath.search(/trash/) != -1)
            apiUrl = domain + 'api/message?email=' + this.props.match.params.to + "&msgCode=" + this.props.match.params.msgId;


        fetch(apiUrl)

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                this.setState({ messageData: data });
                console.log(data);

                if (currPath.search(/inbox/) != -1 || currPath.search(/trash/) != -1)
                    apiUrl = domain + 'api/employee?email=' + data.FromUser;
                else if (currPath.search(/sent/) != -1)
                    apiUrl = domain + 'api/employee?email=' + data.ToUser;


                fetch(apiUrl)

                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        this.setState({ employeeData: data });
                        console.log(data);

                    }.bind(this))
                    .catch(function (err) {

                        toast.error(String(err), {
                            autoClose: 3000
                        });
                    });


            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });

    }

    render() {
        console.log(this.props.match.params.msgId);
        const alignImg = {
            position: 'absolute',
            top: '-50px',
            left: '50%',
            marginLeft: '-50px',
            width: '100px'
        }
        const alignTxt = { textAlign: 'center', marginTop: '-15px' };
        const cardStyle = { borderRadius: '0px', marginTop: '50px', paddingTop: '50px' }
        let email;




        if (this.state.messageData != null && this.state.employeeData != null) {
            if (this.props.location.pathname.search(/inbox/) != -1)
                email = this.state.messageData.FromUser;
            else if (this.props.location.pathname.search(/sent/) != -1)
                email = this.state.messageData.ToUser;
            else if (this.props.location.pathname.search(/trash/) != -1)
                email = 'From ' + this.state.messageData.FromUser + ' To ' + this.state.messageData.ToUser;

                return (
                    <div class='message card' style={cardStyle}>
                        <img class="card-img-top" style={alignImg} src="http://crvsinnovations.net/wp-content/uploads/2018/02/Empty-Icon.png" alt="Card image cap" />


                        <div class="card-body">
                            <h5 class="card-title" style={alignTxt}><a>{this.state.employeeData.Fname + ' ' + this.state.employeeData.Lname}</a></h5>
                            <p style={alignTxt}><font size='2'>{'(' + email + ')'}</font></p>


                            <p class="card-text" style={{ paddingTop: '25px' }}>{this.state.messageData.Content}</p>

                            <p class="card-text"><font size='1'>{this.state.messageData.MessageDate}</font></p>

                            <hr></hr>
                            {/* <a href="#" class="btn btn-primary">Button</a> */}

                        </div>


                    </div>
                );
        }

        return (
            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}
            />
        );

    }
}

export default Message;