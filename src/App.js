import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


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
    this.state = {}
  }

  //Arrow Function so 'this' is bound
  handleRoomInput = (value) => {
    console.log('Room Component value:' + value)
    this.setState({roomNr: value})
    console.log(this.state)
  }

  render() {
    if (!this.state.roomNr)
    {
      return <RoomForm onRoomInput={this.handleRoomInput}/>
    }
    else
    {
      return <div />
    }
  }
}


export default Room;
