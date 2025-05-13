import express from 'express'
import bodyParser from 'body-parser'

import { managers, workers } from './manager.js'
import { checkTz, managersEmployee, checkManager } from './middlewares.js'
const app = express()
const port = 3001

app.use(bodyParser.json())
//hw1
// app.get('/welcome',(req,res)=>{
//     res.send('welcome 😀😁😂🤣😃😄😎😋😊😉😆😅😘😉😗😙🥲🤔🤩🤗🙂☺️😚')
// })

//hw2
app.get('/all', (req, res) => {
    res.status(200).send(workers)
})
app.get('/byId/:tz', checkTz, (req, res) => {
    const { tz } = req.params
    let worker = workers.find(x => x.tz == tz)
    res.status(200).send(worker)
})
app.get('/byId', checkTz, (req, res) => {
    const { tz } = req.query

    let worker = workers.find(x => x.tz == tz)
    res.status(200).send(worker)
})

app.post('/addWorker/:id', checkManager, (req, res) => {
    console.log("dfghjklkjhfddfghjkl");
    const { tz, name, family, phone, salary } = req.body
    let f = workers.find(x => x.tz == tz)
    
    if (f) {
        return res.status(400).send({ error: `worker has already been existed!` })
    }

    const worker = {
        id: workers[workers.length - 1].id + 1,
        tz, name, family, phone, salary,
        idmanager: managers[req.index].id
    }
    console.log(worker);
    workers.push(worker)
    res.status(200).send(true)
   
})

app.delete('/del/:id/:tz',managersEmployee,(req,res)=>{
    workers.splice(req.index, 1)
    res.status(200).send(true)
})

app.listen(port, () => {
    console.log(`run in http://localhost:${port}`);
})