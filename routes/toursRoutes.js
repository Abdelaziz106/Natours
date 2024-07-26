/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */
const express = require('express');
const tourcontroller = require('../controllers/tourController')

const router = express.Router();

//router.param('id', tourcontroller.checkID)
router.route('/top-5-cheap').get(tourcontroller.aliasTopTours,tourcontroller.GetAllTours)
router.route('/tour-stats').get(tourcontroller.getTourStats)
router.route('/monthly-plan/:year').get(tourcontroller.getMonthlyPlan)
router
.route('/:id')
.get(tourcontroller.GetTours)
.patch(tourcontroller.UpdateTour)
.delete(tourcontroller.DeleteTour)
router
    .route('/')
    .get(tourcontroller.GetAllTours)
    .post(tourcontroller.creatingNewTour)
module.exports = router;