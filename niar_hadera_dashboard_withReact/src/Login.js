import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput,
  MDBAlert
} from "mdbreact";

import "./index.css";
import Helmet from 'react-helmet';



const cardStyle = {
  maxWidth: '400px',
  margin: 'auto',
  position: 'relative',
  top: '100px',
};


class Login extends React.Component {
  state = {
    emailInput: '',
    passInput: '',
    errMsg: false,
  };

  submitHandler = event => {

    event.preventDefault();

    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...';


    let LoginDetails = {

      Email: this.state.emailInput,
      Password: this.state.passInput

    }

    let domain;
    console.log(window.location.hostname);
    // if (window.location.hostname === "localhost")
    //   domain = 'http://localhost:55789/';
    // else
    domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

    fetch(domain + 'api/users/login/?LoginDetails=' + JSON.stringify(LoginDetails))
      .then(function (response) {
        if (!response.ok) {
          this.setState({ errMsg: true });
          throw Error(response.statusText);
        }
        return response;
      }
        .bind(this))
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(JSON.stringify(data));
        localStorage.setItem("userData", JSON.stringify(data));
        window.location.replace("/");
      })
      .catch(function (err) {
        console.log(err);

        document.getElementById("submitBtn").disabled = false;
        document.getElementById("submitBtn").innerHTML = 'Login';
      });

  };

  changeHandler = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (

      <MDBContainer>
        {/* <Helmet bodyAttributes={{
          style: 'background-image : url(https://www.techforjustice.org/wp-content/uploads/2015/10/light-graph-background2.jpg);'
            + 'background-repeat: no-repeat; background-size: cover; height: 100vh'
        }} /> */}

        <MDBCard style={cardStyle}>
          <MDBCardBody>
            <MDBCardHeader className="form-header deep-blue-gradient rounded">
              <h3 className="my-3">
                <MDBIcon icon="lock" /> Login:
                </h3>
            </MDBCardHeader>
            <form onSubmit={this.submitHandler}>
              <div className="grey-text">
                <MDBInput
                  label="Type your email"
                  icon="envelope"
                  id="emailInput"
                  onChange={this.changeHandler}
                  group
                  type="email"
                  validate
                  required
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  id="passInput"
                  onChange={this.changeHandler}
                  group
                  type="password"
                  validate
                  required
                />

                {this.state.errMsg ? <MDBAlert color="danger" id="errMsg" >
                  Mail or password are incorrect
                </MDBAlert> : null}

              </div>

              <div className="text-center mt-4">
                <MDBBtn
                  id="submitBtn"
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                >
                  Login
                </MDBBtn>

              </div>
            </form>
            <MDBModalFooter>
              <div className="font-weight-light">
                <p>Not a member? <a href='#'>Sign Up</a></p>
                <p>Forgot <a href='#'>Password?</a></p>
              </div>
            </MDBModalFooter>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
};

export default Login;