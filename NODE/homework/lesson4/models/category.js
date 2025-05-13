import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    description: String,
    doses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Dose'
    }]
})

export default mongoose.model('Category', categorySchema)