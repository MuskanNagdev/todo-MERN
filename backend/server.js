import express from 'express';
import Connections from './database/db.js';
import Routes from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()
const port = 3000


app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/', Routes)
Connections()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})