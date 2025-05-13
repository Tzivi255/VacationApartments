import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// import doseRouter from './homework/lesson4/routers/dose.js'
// import categoryRouter from './homework/lesson4/routers/category.js'
import cityRouter from './project/node/api/routes/city.js'
import categoryRouter from './project/node/api/routes/category.js' 
import advertiserRouter from './project/node/api/routes/advertiser.js' 
import apartmentRouter from './project/node/api/routes/apartment.js' 

const app = express()
const port = 3001

dotenv.config()

app.use(cors())

mongoose.connect(process.env.LOCAL_URI)

// mongoose.connect(process.env.URI_MINE)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({error:err.message})
    })

app.use(bodyParser.json())


app.use('/category', categoryRouter)
app.use('/city', cityRouter)
app.use('/advertiser', advertiserRouter)
app.use('/apartment', apartmentRouter)
app.listen(port, () => {
    console.log(`run in http://localhost:${port}`);
})


//hw1
// app.get('/welcome',(req,res)=>{
//     res.send('welcome 😀😁😂🤣😃😄😎😋😊😉😆😅😘😉😗😙🥲🤔🤩🤗🙂☺️😚')
// })