
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
app.listen(process.env.Port, () => {
    console.log(`Server is runing `);
})

mongoose.connect(process.env.dbUrl).then(() => console.log(`dataBase connection sucessfully`))
    .catch((e) => console.log(`dataBase connection field ${e}`))

router1.post("/push", async(req, res) => {
    const {request_id, author, branch, createdAt} = req.body;
    await GithubActions.create({
        request_id,
        author,
        action: "push",
        to_branch: branch,
        timestamp: createdAt
    })
    res.json({message: "success"})
})

router2.post("/margePR", async(req, res) => {
    const {request_id, author, from_branch, to_branch, createdAt} = req.body;
    await GithubActions.create({
        request_id,
        author,
        action: "merge_pr",
        from_branch,
        to_branch,
        timestamp: createdAt
    })
    res.json({message: "success"})
})

router3.post("/pull", async(req, res) => {
    const {request_id, author, from_branch, to_branch, createdAt} = req.body;
    await GithubActions.create({
        request_id,
        author,
        action: "pull_request",
        from_branch,
        to_branch,
        timestamp: createdAt
    })
    res.json({message: "success"})
})

router4.get("/data", async (req, res) => {
    let data = await GithubActions.find({});
    res.send(data)
})




app.use(router1);
app.use(router2);
app.use(router3);
app.use(router4);