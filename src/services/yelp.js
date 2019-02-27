import axios from 'axios';

const YELP_API_KEY = 'qLXGoQV_l6WFoDLbapbPVAwkou2O7ZixcDxsgKIqCFWHuoT0C-tUA1md1Vcg1dZYcr_e7MFXB7g_8fZsUsZBc7F4q69UIq--RsSjhM0E9XEqGeguBWY7NLoiMFt2XHYx';

const api = axios.create({
baseURL: 'https://api.yelp.com/v3',
// baseURL: 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places',
headers: {
    Authorization: `Bearer ${YELP_API_KEY}`
    },
});

const getCoffeeShops = userLocation => {
    return api.get('businesses/search', {
        params: {
            limit:10,
            categories: 'coffee,coffeeroasteries,coffeeshops',
            ...userLocation,
        }
    })
    .then(res => 
        res.data.businesses.map(business => {
            return {
                name: business.name,
                coords: business.coordinates,
            }
        })
    ) 
    .catch(error => console.error(error))
}

export default {
    getCoffeeShops,
};