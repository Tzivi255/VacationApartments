//צרי פונקציות הוספה, עדכון, מחיקה, שליפה.

import category from "../models/category.js"
//שליפה
export const getAll = (req, res) => {
    category.find().populate({ path: 'doses', select: '-__v -_id' })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCategory = (req, res) => {
    category.findById(req.params.id).populate({ path: 'doses', select: '-__v -_id' })
        .then(c => {
            if (!c) {
                return res.status(404).send({ error: 'category not found!' })
            }
            res.status(200).send(c.doses)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//הוספה
export const create = (req, res) => {
    const { description } = req.body
    const c = new category({ description })
    c.save()
        .then(c => {
            res.status(200).send(c)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
//עדכון
export const update = (req, res) => {
    const { id } = req.params

    category.findByIdAndUpdate(id, req.body, { new: true })
        .then(c => {
            res.status(200).send({ message: `update category ${c._id} succeed!`, c })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

}
//מחיקה
export const remove = (req, res) => {
    category.findByIdAndDelete(req.params.id)
        .then(c => {
            res.status(200).send({ message: `delete category ${c._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}