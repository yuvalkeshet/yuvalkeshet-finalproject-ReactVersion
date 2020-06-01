import React from 'react';
import { MDBBtn, MDBModalBody } from 'mdbreact';
import "./index.css";
import { toast } from 'mdbreact';
import IntegrationAutosuggest from "./autoSuggestEmails";
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Intl } from '@progress/kendo-react-intl';
import { Upload } from '@progress/kendo-react-upload';
import Select from '@material-ui/core/Select';
import SimpleSelect from "./selectInput";
import axios from 'axios';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function getFileNames(fileList) {
    var fileNames = [], i;
    for (i = 0; i < fileList.length; i++)
        fileNames.push(fileList[i].name);
    return fileNames;
}

class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedFile: [],
            departments: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchDeps = this.fetchDeps.bind(this);
        this.sendToAll = this.sendToAll.bind(this);
        this.sendToMyEmployees = this.sendToMyEmployees.bind(this);
        this.sendToUser = this.sendToUser.bind(this);
        this.sendToDepartment = this.sendToDepartment.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }

    fetchDeps() {

        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/departments')

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                this.state.departments = data;
                console.log(this.state.departments);
            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });
    }

    sendToAll(Message) {
        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/message/all', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Message)
        }).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                this.uploadFiles(data);

            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });


    }

    sendToMyEmployees(Message) {
        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/message/my_employees', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Message)
        }).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                this.uploadFiles(data);

            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });

    }

    sendToUser(Message) {
        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/message', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Message)
        }).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                this.uploadFiles(data);

            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });
    }

    sendToDepartment(Message, dep) {
        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/message/department?depName=' + dep, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Message)
        }).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                this.uploadFiles(data);

            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });
    }

    sendMessage() {
        let toEmail = document.getElementById('emailInput');
        let title = document.getElementById('title');
        let content = document.getElementById('content');

        let domain;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';

        fetch(domain + 'api/employee?email=' + toEmail.value)

            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                if (data == null && !toEmail.disabled) {
                    toast.error(String("This email is not registered"), {
                        autoClose: 3000
                    });
                    return;
                }


                let totalSize = 0;
                for (var x = 0; x < this.state.selectedFile.length; x++) {
                    totalSize += this.state.selectedFile[x].size;
                }

                if (totalSize > 1073741824) {

                    toast.error(String("Total size cannot exceed 1GB"), {
                        autoClose: 3000
                    });
                    return;
                }
                console.log(this.state.selectedFile);


                let fileNames = getFileNames(this.state.selectedFile);
                console.log(fileNames);


                let Message = {
                    FromUser: JSON.parse(localStorage['userData']).Email,
                    ToUser: toEmail.value,
                    Title: title.value,
                    Content: content.value,
                    Files: fileNames
                }
console.log(JSON.stringify(Message));
                let selectedValue = document.getElementById("recipients").value;





                switch (selectedValue) {
                    case 'All':
                        this.sendToAll(Message);
                        break;
                    case 'My employees':
                        this.sendToMyEmployees(Message);
                        break;
                    case '':
                        this.sendToUser(Message);
                        break;
                    default:
                        this.sendToDepartment(Message);

                }



            }.bind(this))
            .catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });

    }

    uploadFiles(msgData) {
        let domain, totalSize = 0;

        // if (window.location.hostname === "localhost")
        //     domain = 'http://localhost:55789/';
        // else
            domain = 'http://proj.ruppin.ac.il/bgroup70/prod/';


        const formData = new FormData()

        if (this.state.selectedFile.length > 0)
            formData.append('msgId', String(msgData.msg.MessageCode));

        for (var x = 0; x < this.state.selectedFile.length; x++) {
            formData.append('file', this.state.selectedFile[x]);
            totalSize += this.state.selectedFile[x].size;
        }

        formData.append("totalSize", String(totalSize));


        axios.post("api/fileUpload", formData, {
            // receive two    parameter endpoint url ,form data
        })

            .then(res => { // then print response status
                console.log(res.statusText)
            })
    }

    componentDidMount() {
        this.fetchDeps();
    }


    handleSubmit(event) {
        event.preventDefault();

        this.sendMessage();

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                {/* <Button variant="outlined" color="primary" style={{ width: '94%' }} onClick={this.handleClickOpen}> */}
                <MDBBtn color="primary" style={{ width: '95%' }} onClick={this.handleClickOpen}>Send</MDBBtn>


                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <form onSubmit={this.handleSubmit}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    Compose
                            </Typography>
                                <Button type='submit' color="inherit">
                                    Send
                            </Button>
                            </Toolbar>
                        </AppBar>


                        <MDBModalBody>
                            <IntegrationAutosuggest />
                            <TextField style={{ width: '100%' }}
                                id="title"
                                label="Title"
                                margin="normal"
                                required
                            />
                            <TextField style={{ width: '100%' }}
                                id="content"
                                label="Content"
                                multiline
                                rowsMax="10"
                                margin="normal"
                            />

                            <SimpleSelect deps={this.state.departments} />

                            <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />

                            {/* <Upload
                                batch={false}
                                multiple={true}
                                defaultFiles={[]}
                                withCredentials={false}
                                saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                                removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                            /> */}
                        </MDBModalBody>
                    </form>


                </Dialog>

            </div >
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);