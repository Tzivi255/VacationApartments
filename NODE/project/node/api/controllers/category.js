import Category from "../models/category.js";
export const getAll = (req, res) => {
    Category.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {          
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Category.findById(req.params.id)
        .then(data => {
            if (!data)
                return res.status(404).send({ error: "Category not found." });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { name } = req.body;
    const newCategory = new Category({ name });
    console.log(newCategory);
    newCategory.save()
        .then(data => {
            console.log("succeeded");  
            res.status(200).send(data)
        })
        .catch(err => {
            console.log("failed");
            console.log(err);
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {
    const { id } = req.params
    Category.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            res.status(200).send({ message: `Advertiser ${data.id} updated successfully.` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


