import City from '../models/city.js';
export const getAll = (req, res) => {
    City.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    City.findById(req.params.id)
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "City not found." });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { name } = req.body;
    const newCity = new City({ name });
    newCity.save()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const update = (req, res) => {
    const { id } = req.params
    City.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            res.status(200).send({ message: `Advertiser ${data.id} updated successfully.` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


