
const express = require('express');
const mongoose = require('mongoose');
const GithubActions = require('./GithubActions');
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
 require("dotenv").config()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// parse application/json
var router1 = express.Router();
var router2 = express.Router();
var router3 = express.Router();
var router4 = express.Router();
app.listen(process.env.Port,() => {
    console.log(`Server is runing `);
})

mongoose.connect(process.env.dbUrl).then(() => console.log(`dataBase connection sucessfully`))
.catch((e) => console.log(`dataBase connection field ${e}`))

router1.post("/push", (req, res) => {
    GithubActions.create(req.body)
    console.log(req.body)

})

router2.post("/margePR",(req, res) => {
    GithubActions.create(req.body)
    console.log(req.body)
})

router3.post("/pull", (req, res) => {
    GithubActions.create(req.body)
    console.log(req.body)
})

router4.get("/data", async(req, res) => {
    let data = await GithubActions.find({});
    res.send(data)
})


 
 
app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);