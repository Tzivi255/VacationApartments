import Advertiser from "./node/api/models/advertiser.js"
import jwt from 'jsonwebtoken'
export const UniqueEmail = (req, res, next) => {
    const { email } = req.body
    Advertiser.findOne({ email }).
        then(data => {
            if (data)
                return res.status(400).send({ error: `This email already used!` })
            next()
        }
        )
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const checkAuth = (req, res, next) => {
    console.log("checkAuth");
    
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const arr = req.headers.authorization.split(' ')
    if (arr.length == 1) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const [x, token] = arr
    jwt.verify(token, "d76FBHJ76*y87", (error, decoded) => {
        if (error || !decoded) {
            console.log(error.message);
            return res.status(401).send({ error: error.message })
        }
        // console.log("decoded: ",decoded);
        req.id = decoded.id
        next()
    })

}
export const isAdvertiser = (req, res, next) => {
    const  advertiserId  = req.params.id
    const arr = req.headers.authorization.split(' ')
    const [x, token] = arr
    
    jwt.verify(token, "d76FBHJ76*y87", (error, decoded) => {
        if (error || !decoded) {
            console.log(error.message);
            return res.status(401).send({ error: error.message })
        }
        req.id = decoded.id        
        if (advertiserId != decoded.id)
            return res.status(401).send({ error: 'you are not the user' });
        next()
    })

}


