const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const StudentController = () => { };
StudentController.signup = (params, res) => {
    let name = params.name;
    let email = params.email;
    let password = params.password;
    console.log(name, email, password)
    client.query(`insert into student(name,email,password) values($1,$2,$3) RETURNING *`, [name, email, password],
        (err, results) => {
            if (err) console.log("12", err);
            else {
                console.log("student data entered successfully");
                if (results.rowCount == 0) {
                    res.send({ success: false });
                } else {
                    let token = jwt.sign({ iss: results.rows[0].userid, role: 1, exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret"
                    );
                    console.log(token)
                    res.send({ success: true });
                }
            }
        });
}
module.exports = StudentController;