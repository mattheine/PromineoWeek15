import React from 'react';
import './App.css';
import House from './house';

//creating houses endpoint- using crud-crud
const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  //render through houses and list them all out
  // if state is not null then go through each house and create a componenet for each one
  render(){
    const houses = this.state
    ? this.state.houses.map((house, index) =>
    <House
    key = {index}
    data = {house}
    addNewRoom = {this.addNewRoom}
    deleteRoom = {this.deleteRoom} />)
    : null;
    return(
      <div>
        {houses}
      </div>
    );
  }


  componentDidMount(){
    fetch(HOUSES_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      this.setState({
        houses: data
      });
    });
  }

  deleteRoom(e, house, room) {
    const index = house.rooms.indexOF(room);
    house.rooms.splice(index, 1);
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses){
          if (h._id === house._id){
            let h =house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }

  addNewRoom(e, house, room) {
    house.rooms.push(room)
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses){
          if (h._id === house._id){
            let h =house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }
}

function updateHouse(house){
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
  });

  
}