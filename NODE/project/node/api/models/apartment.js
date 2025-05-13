import mongoose from "mongoose";
const apartmentSchema = mongoose.Schema({
    // דירה:  שם – לא חובה, תיאור,
    //  תמונה, קוד קטגוריה, קוד עיר, כתובת, מס' מיטות, תוספים (רצוי מערך), מחיר, קוד מפרסם
    name: {
        type: String,
        required: false
    },
    description: { type: String },
    images: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City'
    },
    address: { type: String },
    bedsNum: { type: Number },
    extras: [{ type: String }],
    price: { type: Number },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser'
    }
})
export default mongoose.model('Apartment', apartmentSchema) 