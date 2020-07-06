const client = require('../config/database')
const jwt = require('jsonwebtoken');
const { connect } = require('../config/database');
const route = app => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        const data = req.body;
        client.query(`select * from candidate where email=$1 and password=$2`, [data.email, data.password],
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
    })
    app.post("/signup", (req, res) => {
        const data = req.body;
        client.query(`insert into candidate(name,email,password) values($1,$2,$3) RETURNING *`,
            [data.name, data.email, data.password], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
    app.post('/createcamp', (req, res) => {
        const data = req.body;
        client.query(`insert into campaign(name,date,startingtime,endingtime) values($1,$2,$3,$4)`, [data.name, data.date, data.start, data.end],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        console.log('camp created');
                        res.send({ success: true })
                    }
                }

            })
    })
    app.get('/getimage', (req, res) => {
        const data = req.query.email;
        client.query(`select * from voter where email=$1`, [data], (err, results) => {
            if (err) console.log('23', err);
            else {
                if (results.rowCount !== 0) {

                    res.send({ success: true, data: results.rows[0] })
                }
            }
        })
    })
    app.post('/user', (req, res) => {
        const data = req.body;
        client.query(`insert into voter(name,email,image) values($1,$2,$3)`, [data.name, data.email, data.image],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        console.log('voter registered');
                        res.send({ success: true })
                    }

                }
            })
    })
    app.get('/getcamp', (req, res) => {
        client.query(`select * from campaign`, (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows);
                    res.send({ success: true, data: results.rows })
                }
            }
        })
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
        const data = req.body;
        // console.log(data);
        client.query(`update candidate set election=$1 where id=$2`, [data.camp, data.id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results.rowCount);
                    if (results.rowCount !== 0) {
                        client.query(`select date,startingtime from campaign where id=$1`, [data.camp],
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
    })
    app.post('/setcampca', (req, res) => {
        const data = req.body;
        // console.log(data);
        client.query(`update voter set election=$1 where id=$2`, [data.camp, data.id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results.rowCount);
                    if (results.rowCount !== 0) {
                        client.query(`select * from candidate where election=$1`, [data.camp],
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
    })
    app.post('/givevote', (req, res) => {
        const data = req.body;
        client.query(`insert into vote(candidate_id,voter_id,election) values($1,$2,$3)`, [data.candidateid, data.userid, data.campid],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true })
                    }
                }
            })

    })
}
module.exports = route;