import React from 'react'

function Machine(props){
  if(props.status['waschgang'] == 0)
  {
    //Machine not in use
    return(
      <div class="ui message green">
      <h2 class="ui header">{props.title} {props.status['mnr']}</h2>
            Frei
      </div>
          )
  }
  else
  {
    return(
      <div class="ui message red">
      <h2 class="ui header">{props.title} {props.status['mnr']}</h2>
        Restzeit: {props.status['restzeit']} Minuten <br />
        Programm: {props.status['solltemperatur']}°
      </div>
          )

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
