import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');
let request = require('request-promise');

const API_URL = "https://fjgqer7ard.execute-api.eu-central-1.amazonaws.com/default/easywash"
const API_ARG = "roomId"


function Washer(props){
  if(props.status['waschgang'] == 0)
  {
    //Machine not in use
    return(
      <div class="ui message green">
      <h2 class="ui header">Waschmaschine {props.status['mnr']}</h2>
            Frei
      </div>
          )
  }
  else
  {
    return(
      <div class="ui message red">
      <h2 class="ui header">Waschmaschine {props.status['mnr']}</h2>
        Restzeit: {props.status['restzeit']} Minuten <br />
        Programm: {props.status['solltemperatur']}°
      </div>
          )

  }

}

class RoomForm extends Component
{
  // TODO: Fetch data after submitting RoomNbr
  constructor(props){
    super(props)
    this.state = {roomNr: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({roomNr: event.target.value})
    console.log(this.state)
  }

  handleSubmit(event){
    console.log(this.state)
    this.props.onRoomInput(this.state.roomNr)
    event.preventDefault();
  }

  render()
  {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="number" onChange={this.handleChange} />
        <input type="submit" />
      </form>
    )
  }
}


class Room extends Component {
  constructor(props){
    super(props)
    //Phases: 0 - Input of ROOM
    //        1 - Fetching data
    //        2 - finished
    // Could probably be done nicer, we just have to deal with this for now
    this.state = {roomData: null}
  }

  componentDidMount() {
    this._asyncRequest = this.getRoomData().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({roomData: externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  async getRoomData(){
    console.log(API_URL+'?'+API_ARG+'='+this.props.roomNr)
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    return axios.get(API_URL+'?'+API_ARG+'='+this.props.roomNr, config)
      .then((body) =>{
        return body;
      })
      .catch((err)=>{
        console.error(err)
        throw(err)
      }
    )
  }

  renderWashers(washers){
    var renderedMachienes = []
    for (let i in washers) {
      renderedMachienes.push(<Washer status={washers[i]} />)
    }
    return (
      <div class="ui centered equal width grid">
        <div style={{width: '0px', height: '0px', padding: 0}}>{/* Fix some alignment stuff */}</div>
        {renderedMachienes}
        <div style={{width: '0px', height: '0px', padding: 0}}></div>
      </div>)
  }

  render() {
    console.log("rendering Room")
    console.log(this.state.roomData)
    if(this.state.roomData === null)
    {
      console.log("Loading")
      return (<div> Loading... </div>)
    }
    else{

      //Clean Data
      let machines = this.state.roomData['data']['result']['body']['objekt']['raum']['maschinen']
      let dryers = []
      let washers = []
      for (let i in machines) {
        if (machines[i]['typ'] == 'Waschmaschine')
          washers.push(machines[i])
        if (machines[i]['typ'] == 'Trockner')
          dryers.push(machines[i])
      }


      return (
        <div class="room">
          <h1 class="ui centered header first">Waschmaschinen</h1>
          <br />
          <div class="ui centered equal width grid">

          {this.renderWashers(washers)}
          </div>
        </div>
        )
    }
  }

}


class Container extends Component {

  constructor(props){
    super(props)
    //Phases: 0 - Input of ROOM
    //        1 - Fetching data
    //        2 - finished
    // Could probably be done nicer, we just have to deal with this for now
    this.state = {phase: 0}
  }

  //Arrow Function so 'this' is bound
  handleRoomInput = (value) => {
    console.log('Room Component value:' + value)
    this.setState({roomNr: value})
  }

  renderRoomInfo(){
    if (this.state.roomNr)
    {
      console.log(this.state.roomNr)
      return <Room roomNr={this.state.roomNr} />
    }
  }

  render() {
      return (
        <div>
          <RoomForm onRoomInput={this.handleRoomInput}/>
          {this.renderRoomInfo()}
        </div>
      )
    }

}




export default Container;
