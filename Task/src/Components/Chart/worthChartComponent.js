import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import './worthChart.css';
import moment from 'moment'

class WorthChartComponent extends Component{

    componentDidMount(){
        this.handleChart(this.props.data)
    }

    handleChart = (data) =>{
        AmCharts.makeChart( "chartdiv", {
            "type": "serial",
            "theme": "light",
            "dataDateFormat": moment().format("DD-MM-YYYY"),
            "graphs": [ {
              "id": "g1",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "ydata"
            } ],
            "chartScrollbar": {
              "graph": "g1",
              "oppositeAxis": false,
              "offset": 30,
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": true,
              "color": "#AAAAAA"
            },
            "chartCursor": {
              "cursorAlpha": 1,
              "cursorColor": "#258cbb"
            },
            "categoryField": "xdata",
            "categoryAxis": {
              "parseDates": false,
              "equalSpacing": true,
              "gridPosition": "middle",
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "zoomOutOnDataUpdate": false,
            "listeners": [ {
              "event": "init",
              "method": function( e ) {
          
                /**
                 * Pre-zoom
                 */
                e.chart.zoomToIndexes( e.chart.dataProvider.length - 40, e.chart.dataProvider.length - 1 );
          
                /**
                 * Add click event on the plot area
                 */
                e.chart.chartDiv.addEventListener( "click", function() {
          
                  // we track cursor's last known position by "changed" event
                  if ( e.chart.lastCursorPosition !== undefined ) {
                    // get date of the last known cursor position
                    var date = e.chart.dataProvider[ e.chart.lastCursorPosition ][ e.chart.categoryField ];
                    // require user to enter annotation text
          
                    // create a new guide
                    var guide = new AmCharts.Guide();
                    guide.date = date
                    guide.lineAlpha = 1;
                    guide.lineColor = "#c44";
                    guide.position = "top";
                    guide.inside = true;
                    guide.labelRotation = 90;
                    e.chart.categoryAxis.addGuide( guide );
                    e.chart.validateData();
                  }
                } )
              }
            }, {
              "event": "changed",
              "method": function( e ) {
                e.chart.lastCursorPosition = e.index;
              }
            } ],
            "dataProvider":data
          } );
    }

    render(){
        return(
            <div id="chartdiv"></div>
        )
    }
}

export default WorthChartComponent;