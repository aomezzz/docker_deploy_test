import restaurantController from '../controllers/restaurant.controllers.js';
import authMiddleware from '../middleware/authjwt.js';

import express from 'express';
const router = express.Router();
//POST http://localhost:5000/api/v1/restaurants
router.post('/', restaurantController.restaurantCreate);

//GET http://localhost:5000/api/v1/restaurants
router.get('/', authMiddleware.verifytoken,restaurantController.getAllRestaurants);

//GET http://localhost:5000/api/v1/restaurants/:id
router.get('/:id', authMiddleware.verifytoken,restaurantController.getRestaurantById);

//PUT http://localhost:5000/api/v1/restaurants/:id
router.put('/:id', authMiddleware.ModOrAdmin,restaurantController.UpdateRestaurant);

//DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete('/:id',authMiddleware.isAdmin, restaurantController.deleteRestaurant);

export default router;