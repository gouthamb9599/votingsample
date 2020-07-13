const client = require('../config/database')
const jwt = require('jsonwebtoken');
const route = app => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        const params = req.body;
        const controller = require('../controller/candidate.js')
        controller.login(params, res);

    })
    app.post("/signup", (req, res) => {
        const params = req.body;
        const controller = require('../controller/candidate.js')
        controller.signup(params, res);
    })
    app.post('/createcamp', (req, res) => {
        const params = req.body;
        const controller = require('../controller/campaign.js')
        controller.create(params, res)
    })
    app.get('/getimage', (req, res) => {
        const params = req.query.email;
        const controller = require('../controller/voter.js')
        controller.getimage(params, res);
    })
    app.post('/user', (req, res) => {
        const params = req.body;
        const controller = require('../controller/voter.js')
        controller.newvoter(params, res)
    })
    app.get('/getcamp', (req, res) => {
        let controller = require('../controller/campaign.js')
        controller.getcamp(res);
    })
    app.get('/getcandidates', (req, res) => {
        client.query(`select * from candidate`, (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results);
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.post('/setcampuser', (req, res) => {
        const params = req.body;
        const controller = require('../controller/candidate.js')
        controller.setcamp(params, res)
        // console.log(data);

    })
    app.post('/setcampca', (req, res) => {
        const params = req.body;
        const controller = require('../controller/candidate.js')
        controller.setcampca(params, res)

    })
    app.post('/givevote', (req, res) => {
        const params = req.body;
        const controller = require('../controller/voter.js')
        controller.givevote(params, res);
    })
    app.get('/countvote', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/candidate.js')
        controller.countvote(params, res);

    })
}
module.exports = route;