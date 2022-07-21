import React from 'react';
import { House } from './House';
import { houseApi} from '../rest/HousesApi';

export class HousesList extends React.Component {
    state = {
        houses = []
    };

    componentDidMount() {
        this.fetchHouses();
    };

    fetchHouses = async () => {
        const houses = await HousesApi.get();
        this.setState({houses});
    };

    updateHouse = async (updateHouse) => {
        await HousesApi.put(updatedHouse);
        this.fetchHouses();
    };

    render() {
        return(
            <div className= 'house-list'>
                {this.state.houses.map((house) => (
                    <House
                    house= {house}
                    key = {house._id}
                    updateHouse = {this.updateHouse}
                    />
                ))}
            </div>
        )
    }
}