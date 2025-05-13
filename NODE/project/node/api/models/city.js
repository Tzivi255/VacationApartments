import mongoose from 'mongoose';
const citySchema = mongoose.Schema({
    name: String,
    apartments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    }]
})
export default mongoose.model('City', citySchema);