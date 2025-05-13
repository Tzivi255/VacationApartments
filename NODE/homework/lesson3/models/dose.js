import mongoose from "mongoose";

const doseSchema=mongoose.Schema({
    name:String,
    description:String,
    Ingredients:[{
        type:String
    }],
    taste:String,
    Calories:Number
})

export default mongoose.model('Dose',doseSchema)