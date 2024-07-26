/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
const { json, query } = require('express');
const Tour = require('../models/tourModel');
const APIFeatures=require('./../utils/APIFeatures'); 
const { group } = require('console');
//Aliasing Middleware
exports.aliasTopTours =(req,res,next)=>{
    req.query.limit = '5'
    req.query.sort='-ratingsAverage,price'
    req.query.fields= 'name,price,ratingsAverage,summary,difficulty'

    next()
}

exports.GetAllTours = async(req,res)=>{
    try{
   
    const feature = new APIFeatures(Tour.find(),req.query)
        .filter()
        .fields()
        .pagination()
        .sort()
    const tours = await feature.query
    
    res.status(200).json({
    status:'Success',
    result: tours.length,
    data:{
        tours
    }
    }
    
    )
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message:err
        })
    }
}
exports.GetTours =async(req,res)=>{
    try{
    const tours = await Tour.findById(req.params.id);

    res.status(200).json({
        status:'Success',
        result: tours.length,
        data:{
            tours
        }
        }
        
) }catch(err){
    res.status(400).json({
        status: 'failed',
        message: err
    })
}
}

exports.creatingNewTour = async(req,res)=>{
    try{
    const newtour = await Tour.create(req.body)
    res.status(201).json({
        status:'Success',
        data:{
            tour:newtour
        }
    })
}catch(err){
    res.status(400).json({
        status: 'failed',
        message: err
    })
}
    }

exports.UpdateTour = async(req,res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true})
            res.status(201).json({
                status:'Success',
                data:{
                    tour
                }
            })
        }catch(err){

           res.status.json({
        status: 'failed',
        message: 'Invalid Data'
    })
}
    }

exports.DeleteTour = async (req,res)=>{
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status:'Success',
        })
    
  
}
catch(err){
    res.status(500).json({
        status: 'error',
        message: 'It could not be deleted'
    })
}
}

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' }, // Ensure difficulty is a field in your documents
                    numTours: { $sum: 1 },
                    sumRating: { $sum: '$ratingsQuantity' }, // Changed from numRating to sumRating
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ]);

        // Send the response if aggregation succeeds
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        });
    } catch (err) {
        // Improved error response with actual error message
        res.status(404).json({
            status: 'Error',
            message: err.message
        });
    }
};
exports.getMonthlyPlan = async (req,res)=>{
    try{
    const year = req.params.year * 1
    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates'
        },
        {
            $match:{
                startDates:{
                    $gte: new Date (`${year}-01-01`),
                    $lte: new Date (`${year}-12-01`)
                }
            }
        },{

            $group: {
                _id: {$month: '$startDates'},
                numTourStarts: {$sum: 1},
                tours: {$push: '$name'}
                
            }
        },{

                $addFields: {month: '$_id'},
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort:{numTourStarts: 1}
            }
            


        
    ])
    res.status(200).json({
        status: 'success',
        data: {
            plan
        }
    });
    }
    
    catch (err) {
        // Improved error response with actual error message
        res.status(404).json({
            status: 'Error',
            message: err.message
        });
    }
}


