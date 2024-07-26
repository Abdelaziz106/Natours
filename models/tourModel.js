/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
  duration:{
    type: Number,
    required: [true,'A tour must have a duration']
  },
  maxGroupSize:{
    type:Number,
    required: [true,'A tour must have a group size']
  },
  difficulty:{
    type:String,
    required: [true,'A tour must have a difficulty']
  },

    ratingsAverage: {
    type:Number,
    default: 4.5
    },
    ratingsQuantity: {
      type:Number,
      default: 0
      },
      PriceDiscount: Number,
      summary:{
        type:String,
        trim: true,    //It removes all white spaces in the beginning and the end
        required:  [true,'A tour must have a summary']
      },
      description:{
        type: String,
        trim: true
      },
      imageCover:{
        type: String,
        required:  [true,'A tour must have a cover image']
      },
      images: [String],
      createdAt:{
        type: Date,
        default: Date.now()
      },
      startDates: [Date],
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }

}
)
const Tour = mongoose.model('Tour', tourSchema)
module.exports =  Tour;