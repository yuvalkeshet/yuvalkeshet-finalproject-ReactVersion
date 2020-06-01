import React, { Component } from "react";
import { LineChart1, LineChart2 } from "./Charts.js";
import { ToastContainer, toast } from 'mdbreact';


class KPIs extends Component {
    state = {
        kpiData: null
    }
    render() {
        if (this.state.kpiData != null) {
            console.log(this.state.kpiData);
            return (
                <React.Fragment>
                    <LineChart1 kpiData={this.state.kpiData} />
                    <LineChart2 kpiData={this.state.kpiData} />
                </React.Fragment>
            );
        }
        return <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={5000}
        />;
    }

    componentDidMount() {
        fetch('http://localhost:55789/api/kpi')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                this.setState({ kpiData: data });
            }.bind(this)).catch(function (err) {

                toast.error(String(err), {
                    autoClose: 3000
                });


            });
    }
}

export default KPIs;