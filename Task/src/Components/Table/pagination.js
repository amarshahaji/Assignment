import React, {Component} from 'react';
import {Pagination, Row, Col, Container} from 'react-bootstrap';

class PaginationComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageNumbers: [],
            totalRows: this.props.totalRows,  
            active:1,
        }
    }

    componentDidMount(){
        let pageNumbers = [];
        // calculate the number of pages and push into array
        for(let i = 1; i <= Math.ceil(this.props.totalRows / this.props.rowPerPage); i++){
            pageNumbers.push(i)
        }

        this.setState({
            pageNumbers:pageNumbers
        })
    }

    // set the active pagination number
    handlePagination = (number) =>{
        this.props.paginate(number)
        this.setState({
            active:number
        })
    }

    render(){
        return( 
        <Container>
         <Row>
             <Col  md={{ span: 8, offset: 2 }}>
            <Pagination>
                {this.state.pageNumbers.map( number =>(
                    <Pagination.Item key={number} onClick={()=>this.handlePagination(number)} active={this.state.active ===number}>{number}</Pagination.Item>
                ))}
            </Pagination>
            </Col>
         </Row>
        </Container>
        )
    }
} 
export default PaginationComponent;