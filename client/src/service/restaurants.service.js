import api from './api';
const RESTO_API = import.meta.env.VITE_RESTAURANT_API; // Using environment variable

//get all restaurants
const getAllRestaurants = async () => {
    return await api.get(`${RESTO_API}`);
}

//get restaurant by id
const getRestaurantById = async (id) => {
    return await api.get(`${RESTO_API}/${id}`);
}

//update restaurant by id
const editRestaurantById = async (id, data) => {
    return await api.put(`${RESTO_API}/${id}`, data);
}

//delete restaurant by id
const deleteRestaurantById = async (id) => {
    return await api.delete(`${RESTO_API}/${id}`);
}

//add new restaurant
const insertRestaurant = async (data) => {
    return await api.post(`${RESTO_API}`, data);
}

const restaurantService = {
    getAllRestaurants,
    getRestaurantById,
    editRestaurantById,
    deleteRestaurantById,
    insertRestaurant
};

export default restaurantService;
