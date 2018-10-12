import React from 'react'
import {Popup} from 'semantic-ui-react'

class Machine extends React.Component
{
  render(){
    if(this.props.status['waschgang'] == 0)
    {
      //Machine not in use
      return(
        <Popup trigger={
            <div class="ui message green">
                <h2 class="ui header">{this.props.title} {this.props.status['mnr']}</h2>
                      Frei
              </div>
        }
        content={<div style={{whiteSpace: 'pre', textAlign: 'left'}}>{JSON.stringify(this.props.status, null, 2)}</div>}
        on='hover'
        mouseEnterDelay={1000}/>
            )

    }
    else
    {
      return(
        <Popup trigger={  <div class="ui message red">
            <h2 class="ui header">{this.props.title} {this.props.status['mnr']}</h2>
              Restzeit: {this.props.status['restzeit']} Minuten <br />
              Programm: {this.props.status['solltemperatur']}°
        </div>}
        content={<div style={{whiteSpace: 'pre', textAlign: 'left'}}>{JSON.stringify(this.props.status, null, 2)}</div>}
        on='hover'
        mouseEnterDelay={1000}/>
            )

    }
  }
}

function Washer(props){
  return <Machine status={props.status} title="Waschmaschine" />
}

function Dryer(props){
    return <Machine status={props.status} title="Trockner" />
}

//export default Washer;
export {Washer, Dryer};
