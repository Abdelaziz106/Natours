const express = require('express');
const router = express.Router();
const app = express();
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup);
router
    .route('/')
    .get(userController.GetAllUsers)
    .post(userController.CreateUser)

router
    .route('/:id')
    .get(userController.GetUser)
    .patch(userController.UpdateUser)
    .delete(userController.DeleteUser)


module.exports = router;