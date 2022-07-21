const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

class HousesApi {
    get = async() => {
        try{

            const resp= await fetch(HOUSES_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch(exception) {
            console.log('oops looks like fetchHouses had an issue', exception)
        }

    }
    //The update request to add new rooms or delete new rooms
    put = async(house) => {
        try{
            const resp = await fetch(`${HOUSES_ENDPOINT}/${house._id}`,{
                method: 'PUT' , 
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(house)
            });
            return await resp.json();
        } catch(exception) {
            console.log('oops looks like updating houses had an issue', exception);
        }
    }

}

export const housesApi = new HousesApi();