import mongoose from "mongoose";
const advertiserSchema = mongoose.Schema({
    // אימייל - ייחודי, סיסמה, טלפון, טלפון נוסף – לא חובה, מערך דירות

    password: String,
    email: String,
    phone: String,
    phone2: {
        String
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})
export default mongoose.model('Advertiser', advertiserSchema) 