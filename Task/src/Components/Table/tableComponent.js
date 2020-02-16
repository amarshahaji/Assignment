import React, {Component} from 'react';
import {Table, Row, Col, Button} from 'react-bootstrap';
import './tableStyles.css'

class DataTable extends Component{

    // sort call back function 
    sort = () =>{
        this.props.sort()
    }

    render(){
        return(
                <Row>
                <Col lg md="12">
               {this.props.data ?<Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>name</th>
                        <th>ticker</th>
                        <th>asset_class <button className="btnStyles" onClick={this.sort}>sort</button></th>
                        <th>avg_price</th>
                        <th>market_price</th>
                        <th>market_value_ccy</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                               this.props.data.map((data)=>{
                                    return( 
                                       <tr>
                                        <td>{data.name}</td>
                                        <td>{data.ticker}</td>
                                        <td>{data.asset_class}</td>
                                        <td>{data.avg_price}</td>
                                        <td>{data.market_price}</td>
                                        <td>{data.market_value_ccy}</td>
                                        </tr>
                                    )
                                
                                })
                            } 
                    </tbody>
                    </Table>:<Row>Loading....</Row>}
                    </Col>
                    </Row>
        )
    }
}

export default DataTable;