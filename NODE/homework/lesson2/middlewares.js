import { managers, workers } from './manager.js'

export const checkTz = (req, res, next) => {
    const { tz } = req.query

    console.log(tz);
    if (!tz.length == 9) {
        return res.status(404).send({ error: `tz is not valid!` })
    }
    next()
}
export const checkTz2 = (req, res, next) => {
    const { tz } = req.params

    console.log(tz);
    if (!tz.length == 9) {
        return res.status(404).send({ error: `tz is not valid!` })
    }
    next()
}

export const managersEmployee = (req, res, next) => {
    const { id, tz } = req.params
    console.log("tz:"+tz+"id"+id);
    let i = workers.findIndex(x => x.tz == tz && x.idmanager == id)

    if (i == -1) {
        return res.status(404).send({ error: `worker is not found!` })
    }

    req.index = i
    next()
}

export const checkManager = (req, res, next) => {
    const { id } = req.params

    let i = managers.findIndex(x => x.id == id)
    if (i == -1) {
        return res.status(404).send({ error: `manager is not found!` })
    }
    req.index = i
    next()
}