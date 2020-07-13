const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const CampaignController = () => { };
CampaignController.create = (params, res) => {
    client.query(`insert into campaign(name,date,startingtime,endingtime) values($1,$2,$3,$4)`, [params.name, params.date, params.start, params.end],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log('camp created');
                    res.send({ success: true })
                }
            }

        })
}
CampaignController.getcamp = (params, res) => {
    client.query(`select * from campaign`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        }
    })
}

module.exports = CampaignController;
