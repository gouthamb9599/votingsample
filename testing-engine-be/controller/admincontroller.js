const client = require('../config/database')
const jwt = require("jsonwebtoken");
const Adminrouter = require('../routes/Admin/admin');
// var jwtDecode = require('jwt-decode');
const AdminController = () => { };
AdminController.accesslist = (res) => {
    let value = false;
    client.query(`select * from student where access=${value}`,
        (err, results) => {
            if (err) console.log('admin', err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows);
                    res.send({ success: true, data: results.rows })
                }
            }

        })
}
AdminController.assignlist = (res) => {
    let values = true;
    console.log()
    client.query(`select * from student where access=${values}`,
        (err, results) => {
            if (err) console.log('admin', err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows);
                    res.send({ success: true, data: results.rows })
                }
            }

        })
}
AdminController.subjects = (res) => {
    client.query(`select * from subject`, (err, results) => {
        if (err) console.log("admin", err);
        else {
            if (results.rowCount !== 0) {
                console.log(results.rows);
                res.send({ success: true, data: results.rows })
            }
        }
    })
}
AdminController.provideaccess = (params, res) => {
    console.log(params.studentid);
    let val = true;
    client.query(`update student set access=${val} where student_id=${params.studentid}`,
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows)
                    res.send({ success: true })

                }
            }

        })
}
AdminController.assignsubject = (params, res) => {
    console.log(params.studentid);
    client.query(`update student set subject=${params.subject} where student_id=${params.studentid}`,
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log(results.rows)
                    res.send({ success: true })

                }
            }

        })
}
module.exports = AdminController;