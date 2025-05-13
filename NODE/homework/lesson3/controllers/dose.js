
import Dose from "../models/dose.js"

export const getAll = (req, res) => {
    Dose.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Dose.findById(req.params.id)
        .then(dose => {
            if (!dose) {
                return res.status(404).send({ error: 'dose not found!' })
            }
            res.status(200).send(dose)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { name, description, Ingredients,taste,Calories } = req.body
    const newDose = new Dose({
        name,
        description,
        Ingredients,
        taste,
        Calories
    })

    newDose.save()
        .then(dose => {
            res.status(200).send(dose)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    Dose.findByIdAndDelete(req.params.id)
        .then(dose => {
            res.status(200).send({ message: `delete dose ${dose._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}