const client = require('../config/database')
const jwt = require('jsonwebtoken')
const route = app => {
    app.post('/login', (req, res) => {
        console.log(req.body);
        const data = req.body;
        client.query(`select * from accountdata where email=$1 and password=$2`, [data.email, data.password],
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
        client.query(`insert into accountdata(name,email,password) values($1,$2,$3,$4,$5) RETURNING *`,
            [data.name, data.email, data.ProviderId, data.password, 5000], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
}