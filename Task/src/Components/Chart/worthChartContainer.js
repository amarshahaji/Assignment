import React, {Component} from 'react';
import axios from 'axios'
import './worthChart.css'
import moment from 'moment'
import {Row, Col, Container} from 'react-bootstrap'

import Wortchart from './worthChartComponent'

class WorthChart extends Component{
    constructor(){
        super();
        this.state={
          WellFormData: null
        }
    }

    componentDidMount(){
        axios.get('https://canopy-frontend-task.now.sh/api/networth')
        .then((res)=>{
            this.handleDate(res.data);
        })
        .catch((error)=>{
          console.log(error)
        })       
    }

    handleDate = (data) =>{
        let FormattedData = []
        let todaysDate = new Date();
        let endDate = todaysDate.setFullYear(todaysDate.getFullYear() - 1);
        let FomattedEndDate = moment(new Date(endDate)).format("YYYY-MM-DD")
        
        FormattedData = data.map((data)=>{
        return {
            ydata: data.net_worth,
            xdata: moment(data.traded_on, 'DD-MM-YYYY').format('YYYY-MM-DD')
        }
    })
  
    let lastOneYearData = [];
    // Take the last one year data and also take date into DD-MM-YYYY format 
    FormattedData.map(data=>{
        if(data.xdata >= FomattedEndDate){
          lastOneYearData.push({
                ydata: data.ydata,
                xdata: moment(data.xdata, 'YYYY-MM-DD').format('DD-MM-YYYY')
            }); 
        }
     })
    
      this.setState({
        WellFormData: lastOneYearData
      })
    }

    render(){
        return(
          <Container>
            <Row>
              <Col>
              {this.state.WellFormData !==null?<Wortchart data={this.state.WellFormData}></Wortchart>:"loading..."}
              </Col>
            </Row>
          </Container>
        )
    }
}

export default WorthChart;