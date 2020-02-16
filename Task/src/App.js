import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route,Switch} from 'react-router-dom';
import{Container, Row, Col} from 'react-bootstrap'
import WorthChart from './Components/Chart/worthChartContainer'
import HoldingTable from './Components/Table/tableContainer'
function App() {
  return (
    <Container fluid>
    <Row >
      <Col lg md="12">
        <Router>
          <Row className="App">
          <ul>
          <li><Link className="LinkStyle" to = "/Chart">Chart</Link></li>
          <li><Link className="LinkStyle" to = "/Table">Table</Link></li>
          </ul>
          </Row>
          <Switch>
          <Route path='/Chart' component={WorthChart}></Route>
          <Route path='/Table' component={HoldingTable}></Route>
          </Switch>
        </Router>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
