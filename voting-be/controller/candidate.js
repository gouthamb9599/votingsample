const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const CandidateController = () => { };

CandidateController.login = (params, res) => {
    client.query(`select * from candidate where email=$1 and password=$2`, [params.email, params.password],
        (err, results) => {
            if (err) console.log(err);
            else {
                console.log(results);
                if (results.rowCount !== 0) {
                    console.log('access successful')
                    console.log(results.rows[0])
                    let token = jwt.sign({ data: results.rows[0], exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret")
                    // console.log(token);
                    res.send({ success: true, token, data: results.rows[0] })
                }
            }

        })
}
CandidateController.signup = (params, res) => {
    client.query(`insert into candidate(name,email,password) values($1,$2,$3) RETURNING *`,
        [params.name, params.email, params.password], (err, results) => {
            if (err) console.log(err);
            else {
                console.log("user data entered successfully");
                res.send({ success: true })
            }
        })
}
CandidateController.setcamp = (params, res) => {
    client.query(`update candidate set election=$1 where id=$2`, [params.camp, params.id],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results.rowCount);
                if (results.rowCount !== 0) {
                    client.query(`select date,startingtime from campaign where id=$1`, [params.camp],
                        (err2, result) => {
                            if (err2) console.log(err2);
                            else {

                                if (result.rowCount !== 0) {
                                    res.send({ success: true, data: result.rows })
                                }
                            }
                        })
                }
            }
        })
}
CandidateController.setcampca = (params, res) => {
    client.query(`update voter set election=$1 where id=$2`, [params.camp, params.id],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results.rowCount);
                if (results.rowCount !== 0) {
                    client.query(`select * from candidate where election=$1`, [params.camp],
                        (err2, result) => {
                            if (err2) console.log(err2);
                            else {

                                if (result.rowCount !== 0) {
                                    res.send({ success: true, data: result.rows })
                                }
                            }
                        })
                }
            }
        })
}
CandidateController.countvote = (params, res) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    client.query(`select election from candidate where id=$1`, [params],
        (err1, result1) => {
            if (err1) console.log(err1)
            else {
                if (result1.rowCount !== 0) {
                    const camp = result1.rows[0].election
                    client.query(`select endingtime from campaign where id=$1 `, [camp],
                        (err, results) => {
                            if (err) console.log(err);
                            else {
                                if (results.rowCount !== 0) {
                                    var time = results.rows[0].endingtime.localeCompare(time);
                                    if (time === -1) {
                                        res.send({ success: false })
                                    }
                                    else {
                                        client.query(`select * from candidate where election=$1`, [camp],
                                            (err2, result) => {
                                                if (err2) console.log(err2);
                                                else {

                                                    if (result.rowCount !== 0) {
                                                        res.send({ success: true, data: result.rows })
                                                    }
                                                }
                                            })
                                    }

                                }
                            }
                        })
                }
            }
        })
}

module.exports = CandidateController;