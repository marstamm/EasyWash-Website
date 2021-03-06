import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Washer, Dryer} from './machienes.js';

const axios = require('axios');
const request = require('request-promise');

const API_URL = "https://fjgqer7ard.execute-api.eu-central-1.amazonaws.com/default/easywash"
const API_ARG = "roomId"

function wait (timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }

class RoomForm extends Component
{
  constructor(props){
    super(props)
    this.state = {roomNr: this.props.defaultValue ? this.props.defaultValue : 5015}
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
        <div class="ui icon input">
          <input type="number" placeholder={this.state.roomNr} onChange={this.handleChange}/>
          <i class="search icon" />
        </div>

        <button class="ui button" onClick={this.handleSubmit}>
          Go!
        </button>
      </form>
    )
  }
}


class Room extends Component {
  constructor(props){
    super(props)
    this.state = {roomData: null}
  }

  componentDidUpdate(prevProps) {
    if(this.props.roomNr != prevProps.roomNr) // Check if a new Room is selected
    {
           this.setState({roomData: null});
           this.componentDidMount();
    }
  }

  componentDidMount() {
    this._asyncRequest = this.getRoomData().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({roomData: externalData});
        this.startTimer();
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

  async startTimer () {
      //Check again in a minute
      console.log("startTimeout")
      await wait(60000);
      this.componentDidMount()
    };

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

  renderDryers(dryers){
    var renderedMachienes = []
    for (let i in dryers) {
      renderedMachienes.push(<Dryer status={dryers[i]} />)
    }
    return (
      <div class="ui centered equal width grid">
        <div style={{width: '0px', height: '0px', padding: 0}}>{/* Fix some alignment stuff */}</div>
        {renderedMachienes}
        <div style={{width: '0px', height: '0px', padding: 0}}></div>
      </div>)
  }


  renderRoomInfo(){
    let roomInfo = this.state.roomData['data']['result']['body']['objekt']
    return(
      <div>
        <h1 class="ui centered header first">{roomInfo.bezeichnung}</h1>
        <p style={{textAlign: 'center'}}>{roomInfo.strasse} {roomInfo.hausnr}, {roomInfo.plz} {roomInfo.ort}</p>
      </div>
    )
  }


  render() {
    console.log("rendering Room")
    console.log(this.state.roomData)
    if(this.state.roomData === null)
    {
      console.log("Loading")
      return (
        <div class="ui active dimmer">
          <div class="ui text loader">Loading</div>
          <p></p>
        </div>)
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
          {this.renderRoomInfo()}
          <h2 class="ui centered header first">Waschmaschinen</h2>
          <br />
          <div class="ui centered equal width grid">

          {this.renderWashers(washers)}
          </div>

          <div class="ui divider"></div>
          <h2 class="ui centered header">Trockner</h2>
          <br />

          {this.renderDryers(dryers)}
        </div>
        )
    }
  }
}


class Container extends Component {

  constructor(props){
    super(props)
    this.state = {roomNr: parseInt(localStorage.getItem("roomNr"))}
  }

  //Arrow Function so 'this' is bound
  handleRoomInput = (value) => {
    console.log('Room Component value:' + value)
    localStorage.setItem("roomNr", value)
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
          <RoomForm onRoomInput={this.handleRoomInput} defaultValue={this.state.roomNr}/>
          {this.renderRoomInfo()}
        </div>
      )
    }
}


export default Container;
