const mongoose = require('mongoose');

const GithubActions = new mongoose.Schema({
    request_id:  {type: String},
    author: {type: String},
    action: {type: String},
    from_branch: {type: String},
    to_branch: {type: String},
    timestamp: {type: Date}
}, {
    timestamps: true,
    collection: "GithubActions"
})

module.exports = mongoose.model("GithubActions", GithubActions);