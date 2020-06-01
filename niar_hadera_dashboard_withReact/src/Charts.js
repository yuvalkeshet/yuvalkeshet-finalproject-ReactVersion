import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { MDBCard } from 'mdbreact';

var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const cardStyle = { marginLeft: 'auto', marginRight: 'auto', padding: '15px', borderRadius: '0px', marginBottom: '20px' }

class LineChart1 extends Component {

    constructor() {
        super();
        this.generateDataPointsLine1 = this.generateDataPointsLine1.bind(this);
        this.generateDataPointsMach2 = this.generateDataPointsMach2.bind(this);
    }

    generateDataPointsLine1() {

        var dps = [];
        for (var i = 0; i < 30; i++) {

            dps.push({
                x: new Date(this.props.kpiData[i].Timestamp),
                y: this.props.kpiData[i].OutputLine1
            });

        }
        return dps;
    }
    generateDataPointsMach2() {

        var dps = [];
        for (var i = 0; i < 30; i++) {

            dps.push({
                x: new Date(this.props.kpiData[i].Timestamp),
                y: this.props.kpiData[i].OutputMachine2
            });

        }
        return dps;
    }

    render() {
        const options = {
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true, 
            title: {
                text: "Line 1 Production"
            },
            axisX: {
                labelAngle: -30,
                // interval: 3,
                // intervalType: "day",
                // valueFormatString: "MMM DD",
            },
            axisY: {
                title: "Ton / hr",
                prefix: "",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "MMM DD YYYY",
                yValueFormatString: "#.00",
                dataPoints: this.generateDataPointsLine1(),
                showInLegend: true,
                markerType: "circle",
                legendText: "line 1",
            },
            {
                type: "line",
                xValueFormatString: "MMM DD YYYY",
                yValueFormatString: "#.00",
                dataPoints: this.generateDataPointsMach2(),
                showInLegend: true,
                markerType: "triangle",
                legendText: "machine 2",
            }
            ]
        }


        return (
            <MDBCard style={cardStyle}>
                <CanvasJSChart options={options}
                //onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}


            </MDBCard>
        );
    }


}

class LineChart2 extends Component {

    constructor() {
        super();
        this.generateDataPointsLine1 = this.generateDataPointsLine1.bind(this);
        this.generateDataPointsMach2 = this.generateDataPointsMach2.bind(this);
    }

    generateDataPointsLine1() {

        var dps = [];
        for (var i = 0; i < 30; i++) {
            dps.push({
                x: new Date(this.props.kpiData[i].Timestamp),
                y: this.props.kpiData[i].OutputLine3,
              
            });
            // if (this.props.kpiData[i].OutputLine3 < this.props.kpiData[i].OutputMachine8) {
            //     dps.push({
            //         x: new Date(this.props.kpiData[i].Timestamp),
            //         y: this.props.kpiData[i].OutputLine3,
            //         markerType: "cross", markerColor: "tomato" , markerSize: 12
            //     });
            // }
            // else {
            //     dps.push({
            //         x: new Date(this.props.kpiData[i].Timestamp),
            //         y: this.props.kpiData[i].OutputLine3,
                  
            //     });
            // }

        }
        return dps;
    }
    generateDataPointsMach2() {

        var dps = [];
        for (var i = 0; i < 30; i++) {

            dps.push({
                x: new Date(this.props.kpiData[i].Timestamp),
                y: this.props.kpiData[i].OutputMachine8
            });

        }
        return dps;
    }

    render() {
        const options = {
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Line 3 Production"
            },
            axisX: {
                labelAngle: -30,
                // interval: 3,
                // intervalType: "day",
                // valueFormatString: "MMM DD",
            },
            axisY: {
                title: "Ton / hr",
                prefix: "",
                includeZero: false
            },
            data: [{
                type: "line",
                xValueFormatString: "MMM DD YYYY",
                yValueFormatString: "#.00",
                dataPoints: this.generateDataPointsLine1(),
                showInLegend: true,
                markerType: "circle",
                legendText: "line 3",
            },
            {
                type: "line",
                xValueFormatString: "MMM DD YYYY",
                yValueFormatString: "#.00",
                dataPoints: this.generateDataPointsMach2(),
                showInLegend: true,
                markerType: "triangle",
                legendText: "machine 8",
            }
            ]
        }


        return (
            <MDBCard style={cardStyle}>
                <CanvasJSChart options={options}
                //onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}


            </MDBCard>
        );
    }
}

export {
    LineChart1,
    LineChart2
}     