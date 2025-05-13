import mongoose from 'mongoose';
const categorySchema = mongoose.Schema({
    name: String,
    apartments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    }]
})
export default mongoose.model('Category', categorySchema);