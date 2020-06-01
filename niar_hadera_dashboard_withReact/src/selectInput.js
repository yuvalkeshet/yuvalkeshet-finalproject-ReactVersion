import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        marginLeft: '0px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        recipients: '',
        name: 'hai',
        labelWidth: 0,
    };

    //   componentDidMount() {
    //     this.setState({
    //       labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    //     });
    //   }

    handleChange = event => {

        this.setState({ [event.target.name]: event.target.value });

        if (event.target.value != "")
            document.getElementById('emailInput').disabled = true;
        else
            document.getElementById('emailInput').disabled = false;

    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Recipients</InputLabel>
                    <Select
                        value={this.state.recipients}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'recipients',
                            id: 'recipients',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <hr></hr>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="My employees">My employees</MenuItem>
                        <hr></hr>
                        {
                            this.props.deps.map((dep) => {
                                return <MenuItem value={dep.DepName}>{dep.DepName}</MenuItem>
                            })
                        }
                    </Select>

                </FormControl>
            </form>
        );
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);