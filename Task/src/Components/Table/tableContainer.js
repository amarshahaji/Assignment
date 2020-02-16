import React, {Component} from 'react';
import axios from 'axios';
import TableComponent from './tableComponent';
import Pagination from './pagination';
import { Row, Col } from 'react-bootstrap';

class HoldingTable extends Component{
    constructor(){
        super();
        this.state={
            data:'',
            currentPage:1,
            rowPerPage:10,
            indexOfFirstRow:'',
            indexOfLoastRow:'',
            currentRows:'',
            
        }
    }

    componentDidMount(){
       this.getTableData() 
    }

    // call the API for table data
    getTableData = (data) =>{
        axios.get('https://canopy-frontend-task.now.sh/api/holdings')
        .then((res)=>{
            this.setState({
                data : res.data.payload,
            })
        })
        .catch((error)=>{
            console.log(error)
        })
       
    }

    // set the sorted data to state
    sortByAssetClass =()=>{
        let data = this.state.data.sort(this.sort)
        this.setState({
            data:data
        })
    }

    // sort the table data base on asset_class
    sort = (firstObj, secondObj) =>{

        const firstAssetClass = firstObj.asset_class.toUpperCase()
        const secondAssetClass = secondObj.asset_class.toUpperCase()
        let comparison = 0;

        if(firstAssetClass > secondAssetClass){
            comparison = 1;
        } else if(firstAssetClass < secondAssetClass){
            comparison = -1
        }
        return comparison;  
    }

    // set the current page of pagination
    paginate = (number) =>{
        this.setState({
            currentPage:number
        })
    }

    render(){

        // Get indexof first and last row, get the current row
        const indexOfLoastRow = this.state.currentPage * this.state.rowPerPage
        const indexOfFirstRow = indexOfLoastRow - this.state.rowPerPage;
        const currentRows = this.state.data.slice(indexOfFirstRow, indexOfLoastRow)
        
        return(
            <Row>
                <Col lg md="12">
                <TableComponent
                 data = {currentRows}
                 sort = {this.sortByAssetClass}
                >
                </TableComponent>
                
                {this.state.data.length > 0?
                    <Pagination
                        rowPerPage={this.state.rowPerPage}
                        totalRows = {this.state.data.length} 
                        paginate={this.paginate}>
                    </Pagination>
                    : ""
                }
                </Col>
            </Row>
        )
    }
}

export default HoldingTable;