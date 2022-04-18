import express from 'express'
import bodyParser from 'body-parser'
import pool from './db.js'
import cors from 'cors' //+ NEW

const app = express()
const PORT = process.env.PORT || 4444

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//+ NEW //////////////////////////////////////////////////////////////

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//+ NEW //////////////////////////////////////////////////////////////


app.post('/', (req, res) => {

    console.log(req.body)

    // send data to postgres db
    pool.query('INSERT INTO Results(data) VALUES ($1)', [req.body], (err, res) => {
        if(err){
            console.log('error inserting data:')
            console.log(err)
        }
    })


    res.status(200).json('success')

})

app.listen(PORT, ()=> {
    console.log('app listening on', PORT)
    console.log('=========='+ Date.now() +'=============')   
})