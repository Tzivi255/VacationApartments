import Apartment from "../models/apartment.js";
import Category from "../models/category.js";
import City from "../models/city.js";
import Advertiser from "../models/advertiser.js";

export const create = async (req, res) => {
    try {
        console.log("Received files:", req.files);
        console.log("Received body:", req.body);

        const advertiser = req.id; // מזהה המפרסם
        const { apartment: apartmentJSON } = req.body;

        // פענוח ה־JSON שנשלח עם ה־'apartment'
        const { name, description,
            category,
            city,
            address,
            bedsNum,
            extras,
            price
        } = JSON.parse(apartmentJSON); // פענוח מ־JSON

        // יצירת מערך התמונות
        let imagess = [];
        if (req.files && req.files.length > 0) {
            imagess = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype
            }));
        }

        // יצירת הדירה החדשה עם מערך התמונות
        const newApartment = new Apartment({
            name, description, images: imagess, category, city, address, bedsNum, extras, price, advertiser
        });

        // שמירת הדירה החדשה ב־MongoDB
        const apartment = await newApartment.save();

        // עדכון הקטגוריה, העיר והמפרסם
        await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } });
        await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } });
        await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } });

        res.status(201).json(apartment);
    } catch (err) {
        console.error("Error creating apartment:", err.message);
        res.status(500).json({ error: err.message });
    }
};



export const getAll = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate({ path: 'category', select: '-_id name' })
            .populate({ path: 'city', select: '-_id name' })
            .populate({ path: 'advertiser', select: '-_id email phone phone2' });

        const formattedApartments = apartments.map(apartment => ({
            ...apartment._doc, // שמירה על כל שאר הנתונים
            images: apartment.images.map(img => ({
                data: `data:${img.contentType};base64,${img.data.toString('base64')}`
            }))
        }));

        res.status(200).send(formattedApartments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getAllIds = async (req, res) => {
    try {
        const apartments = await Apartment.find().select('_id');
        console.log(apartments);

        const ids = apartments.map(apartment => apartment._id);
        res.status(200).send(ids); // החזרת רשימת ה-ids
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const remove = (req, res) => {
    console.log("remove");

    console.log("req.params", req.params);

    Apartment.findByIdAndDelete(req.params.apartmentId)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: 'apartment not found!' })
            }
            apartment.deleteOne()
                .then(async () => {
                    await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                    await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
                    await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } })
                    // res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
                })
            res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

// export const update = (req, res) => {
//     const { id } = req.params
//     Apartment.findByIdAndUpdate(id, req.body)
//         .then(async apartment => {
//             const { category, advertiser, city } = req.body
//             if (category) {
//                 await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
//                 await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
//             }
//             if (advertiser) {
//                 await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } })
//                 await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } })
//             }
//             if (city) {
//                 await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
//                 await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
//             }

//             res.status(200).send({ message: `update apartment ${apartment._id} succeed!` })
//         })
//         .catch(error => {
//             res.status(500).send({ error: error.message })
//         })
// }
export const update = async (req, res) => {
    try {
        console.log("_id", req.params.apartmentId);

        console.log("Received files:", req.files);
        console.log("Received body:", req.body);

        const { apartmentId } = req.params; // מזהה הדירה לעדכון
        const { apartment: apartmentJSON } = req.body;

        // פענוח ה־JSON שנשלח עם ה־'apartment'
        const { name, description, category, city, address, bedsNum, extras, price, advertiser } = JSON.parse(apartmentJSON);

        // יצירת אובייקט עדכון
        const updateData = {
            name,
            description,
            category,
            city,
            address,
            bedsNum,
            extras,
            price,
        };

        // עדכון מערך התמונות אם נשלחו קבצים חדשים
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype
            }));
        }

        // עדכון הדירה ב־MongoDB
        const updatedApartment = await Apartment.findByIdAndUpdate(apartmentId, updateData, { new: true });

        if (!updatedApartment) {
            return res.status(404).json({ error: "Apartment not found" });
        }

        // עדכון הקטגוריה, המפרסם והעיר אם השתנו
        const { category: oldCategory, advertiser: oldAdvertiser, city: oldCity } = updatedApartment;

        if (category && category !== oldCategory) {
            await Category.findByIdAndUpdate(category, { $push: { apartments: updatedApartment._id } });
            await Category.findByIdAndUpdate(oldCategory, { $pull: { apartments: updatedApartment._id } });
        }
        if (advertiser && advertiser !== oldAdvertiser) {
            await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: updatedApartment._id } });
            await Advertiser.findByIdAndUpdate(oldAdvertiser, { $pull: { apartments: updatedApartment._id } });
        }
        if (city && city !== oldCity) {
            await City.findByIdAndUpdate(city, { $push: { apartments: updatedApartment._id } });
            await City.findByIdAndUpdate(oldCity, { $pull: { apartments: updatedApartment._id } });
        }

        res.status(200).json(updatedApartment);
    } catch (err) {
        console.error("Error updating apartment:", err.message);
        res.status(500).json({ error: err.message });
    }
};


export const getById = (req, res) => {
    Apartment.findById(req.params.id)
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "Apartment not found." });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//מספר גדול ממיטות
export const byMoreNumBeds = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ bedsNum: { $gt: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//מספר קטן ממיטות
export const byLessNumBeds = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ bedsNum: { $lt: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//מספר שווה ממיטות
export const byEqualNumBeds = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ bedsNum: { $eq: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const byMorePrice = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ price: { $gt: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const byLessPrice = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ price: { $lt: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const byEqualPrice = (req, res) => {
    const num = req.params
    Apartment.find()
        .where({ price: { $eq: num } })
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// export const getApartmentsByAdvertiserId = (req, res) => {
//     Advertiser.findById(req.params.id)
//         .populate({ path: 'apartments', select: '-__v -_id -category -_' })
//         .then(data => {
//             if (!data)
//                 return res.status(404).send({ error: "Advertiser not found." });
//             res.status(200).send(data.apartments)
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })
// }
export const getApartmentsByAdvertiserId = async (req, res) => {
    try {
        const advertiser = await Advertiser.findById(req.params.id)
            .populate({
                path: 'apartments',
                // הוספת populate נוסף לשדות הנוספים (קטגוריה ועיר)
                populate: [
                    { path: 'category', select: '-_id name' }, // הוספת קטגוריה
                    { path: 'city', select: '-_id name' } // הוספת עיר
                ],
                select: '-__v -_id -category -advertiser', // שמירה על שדות לא רצויים
            });

        if (!advertiser) {
            return res.status(404).json({ error: "Advertiser not found." });
        }
        console.log(advertiser.apartments);

        // עיבוד המידע כדי להמיר את התמונות ל-Base64
        const apartments = advertiser.apartments.map(apartment => ({
            ...apartment.toObject(),
            images: apartment.images.map(img => ({
                data: `data:${img.contentType};base64,${img.data.toString('base64')}`
            }))
        }));

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getApartmentsByCategoryId = (req, res) => {
    Category.findById(req.params.id)
        .populate({ path: 'apartments', select: '-__v -_id -category -_' })
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "Category not found." });
            res.status(200).send(data.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getApartmentsByCityId = (req, res) => {
    City.findById(req.params.id)
        .populate({ path: 'apartments', select: '-__v -_id -category -_' })
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "City not found." });
            res.status(200).send(data.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

//פונקציה של סינון טובה
// export const apartmentsWithFilter = async (req, res) => {
//     const { city, category, countBed, amountOfMoney } = req.body;


//     try {
//         const apartments = await Apartment.find()
//             .populate({ path: 'category', select: 'name' })
//             .populate({ path: 'city', select: 'name' })

//         const filteredApartments = apartments.filter(apartment => {
//             const cityMatch = apartment.city.name === city || city === 'city';
//             const categoryMatch = apartment.category.name === category || category === 'category';
//             const priceMatch = (amountOfMoney <0 || apartment.price <= amountOfMoney);
//             const bedsMatch = (apartment.bedsNum === countBed || apartment.bedsNum > countBed);

//             return cityMatch && categoryMatch && priceMatch && bedsMatch;
//         });

//         res.status(200).send(filteredApartments);
//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// }
export const apartmentsWithFilter = async (req, res) => {
    const { city, category, countBed, amountOfMoney } = req.body;
    try {
        const apartments = await Apartment.find()
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'city', select: 'name' });
        const filteredApartments = apartments.filter(apartment => {
            const cityMatch = (apartment.city && apartment.city.name === city) || city === 'city';
            const categoryMatch = (apartment.category && apartment.category.name === category) || category === 'category';
            const priceMatch = (amountOfMoney < 0 || apartment.price <= amountOfMoney);
            const bedsMatch = (apartment.bedsNum === countBed || apartment.bedsNum > countBed);
            return cityMatch && categoryMatch && priceMatch && bedsMatch;
        })
        filteredApartments.map(apartment => ({
            ...apartment._doc, // שומר על כל שאר הנתונים
            images: apartment.images.map(img => ({
                data: `data:${img.contentType};base64,${img.data.toString('base64')}`
            }))
        }));

        res.status(200).send(filteredApartments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
