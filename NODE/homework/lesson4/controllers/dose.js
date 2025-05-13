
import Dose from "../models/dose.js"
import Category from "../models/category.js"

export const getAll = (req, res) => {
    Dose.find().populate({ path: 'category', select: '-__v -_id' })
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

    const { name, description, Ingredients, taste, Calories, category } = req.body
    const newDose = new Dose({
        name,
        description,
        Ingredients,
        taste,
        Calories,
        category
    })

    newDose.save()
        .then(async dose => {
            await Category.findByIdAndUpdate(category, { $push: { doses: dose._id } })
            res.status(200).send(dose)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    Dose.findByIdAndDelete(req.params.id)
        .then(dose => {
            if (!dose) {
                return res.status(404).send({ error: 'dose not found!' })
            }
            dose.deleteOne()
                .then(async () => {
                    await Category.findByIdAndUpdate(dose.category, { $pull: { doses: dose._id } })
                    res.status(200).send({ message: `delete dose ${dose._id} succeed!` })
                })
            res.status(200).send({ message: `delete dose ${dose._id} succeed!` })
        })
}

export const update = (req, res) => {

    const { id } = req.params
    Category.findByIdAndUpdate(id, req.body)
        .then(async dose => {
            const { category } = req.body
            if (category) {
                await Category.findByIdAndUpdate(category, { $push: { doses: dose._id } })
                await Category.findByIdAndUpdate(dose.category, { $pull: { doses: dose._id } })
            }
            res.status(200).send({ message: `update dose ${dose._id} succeed!` })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}