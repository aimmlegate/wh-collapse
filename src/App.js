import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
  Input } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const startMass = 2000;

const getMax = val => val * 1.1;
const getMin = val => val * 0.9;
const getF = val => val * 0.5;
const getT = val => val * 0.1;

const initialState = {
  shipMass: 100,
  whStatus: "NEW",
  jumpLock: false,
  predMax: getMax(startMass),
  predMin: getMin(startMass),
  jump: 0,
}


const changeStatusLog = state => console.log(`Статус изменился на ${state.whStatus}`)

class App extends Component {
  state = initialState

  handleShipChange = e => {
    const newMass = parseInt(e.target.value) || 0
    this.setState({ shipMass: newMass })
  }



  handleJump = () => {
    const { whStatus, predMax, predMin, shipMass, jump } = this.state
    switch (whStatus) {
      case "NEW": {
        this.setState({
          predMax: predMax - shipMass,
          predMin: predMin - shipMass,
          jump: jump + 1,
        }, () => console.log(`#${this.state.jump}, масса корабля: ${this.state.shipMass}, макс. масса дыры: ${this.state.predMax}, мин. масса дыры: ${this.state.predMin}, статус дыры: ${this.state.whStatus}` ))
        break;
      }
      case "CRIT": {
        this.setState({
          jumpLock: true,
          predMax: predMax - shipMass,
          predMin: predMin - shipMass,
          jump: jump + 1,
        }, () => console.log(`#${this.state.jump}, масса корабля: ${this.state.shipMass}, макс. масса дыры: ${this.state.predMax}, мин. масса дыры: ${this.state.predMin}, статус дыры: ${this.state.whStatus}` ))
        break;
      }
      case "WERGE": {
        this.setState({
          predMax: predMax - shipMass,
          predMin: predMin - shipMass,
          jump: jump + 1,
        }, () => console.log(`#${this.state.jump}, масса корабля: ${this.state.shipMass}, макс. масса дыры: ${this.state.predMax}, мин. масса дыры: ${this.state.predMin}, статус дыры: ${this.state.whStatus}` ));
        break;
      }
      default: return null
    }
  }

  handleCritBtn = () => {
    const { shipMass } = this.state
    this.setState({
      whStatus: "CRIT",
      predMax: getF(getMax(startMass)),
      predMin: getF(getMin(startMass)) - shipMass + 1
    }, () => console.log(`Статус изменился на ${this.state.whStatus}`));
  }

  handleJumpStatusWerge = () => {
    const { predMax } = this.state
    if (predMax > getT(getMax(startMass))) {
      this.setState({
        whStatus: "WERGE",
        jumpLock: false,
        predMax: getT(getMax(startMass)) - 1 }, () => console.log(`Статус изменился на ${this.state.whStatus}`))
    } else {
      this.setState({ jumpLock: false })
    }
  }

  handleJumpStatusCrit = () => {
    const { predMin } = this.state
    if (predMin < getT(getMin(startMass))) {
      this.setState({
        jumpLock: false,
        predMin: getT(getMin(startMass)) })
    } else {
      this.setState({ jumpLock: false })
    }
  }

  handleReset = () => this.setState(initialState)

  renderJumpStatus = () => {
    const { whStatus, jumpLock } = this.state;
    if (whStatus === "CRIT" && jumpLock) {
      return (
      <ButtonGroup>
        <Button onClick={this.handleJumpStatusCrit}>50%</Button>
        <Button onClick={this.handleJumpStatusWerge}>10%</Button>
      </ButtonGroup>
      )
    }
    else return null
  }

  renderCritBtn = () => {
    const { whStatus } = this.state;
    if (whStatus === "NEW") {
      return <Button color="primary" onClick={this.handleCritBtn}>Осталось 50%?</Button>
    }
    return null
  }

  render() {
    const {
      shipMass,
      whStatus,
      predMax,
      predMin,
      jumpLock,
    } = this.state
    return (
      <Container>
        <Row>
          <Col style={{padding: '20px'}}>
            <ListGroup style={{padding: '10px'}}>
              <ListGroupItem>Масса корабля: {
                <Input value={shipMass} onChange={this.handleShipChange}/>
              }</ListGroupItem>
              <ListGroupItem>Масса дыры max: {predMax}</ListGroupItem>
              <ListGroupItem>Масса дыры min: {predMin}</ListGroupItem>
              <ListGroupItem>Статус дыры: {whStatus}</ListGroupItem>
            </ListGroup>
            <div style={{padding: '10px'}}>
              <Button color="success" onClick={this.handleJump} disabled={jumpLock}>Прыгнуть</Button>{' '}
              {this.renderJumpStatus()}{' '}
              {this.renderCritBtn()}{' '}
            </div>
            <div style={{padding: '10px'}}>
              <Button color="danger" onClick={this.handleReset}>Сбросить</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
