const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const VoterController = () => { };
VoterController.newvoter = (params, res) => {
    client.query(`insert into voter(name,email,image) values($1,$2,$3)`, [params.name, params.email, params.image],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    console.log('voter registered');
                    res.send({ success: true })
                }

            }
        })
}
VoterController.getimage = (params, res) => {
    client.query(`select * from voter where email=$1`, [params], (err, results) => {
        if (err) console.log('23', err);
        else {
            if (results.rowCount !== 0) {

                res.send({ success: true, data: results.rows[0] })
            }
        }
    })
}
VoterController.givevote = (params, res) => {
    client.query(`insert into vote(candidate_id,voter_id,election) values($1,$2,$3)`, [params.candidateid, params.userid, params.campid],
        (err, results) => {
            if (err) console.log('13', err);
            else {
                if (results.rowCount !== 0) {
                    client.query(`select count from candidate where id=$1`, [params.candidateid],
                        (errs, result) => {
                            if (errs) console.log('12', errs);
                            else {
                                console.log(result.rows[0].count);
                                const vote = ((result.rows[0].count - 0) + (1 - 0));
                                console.log(vote);
                                client.query(`update candidate set count=$1 where id=$2`, [vote, params.candidateid],
                                    (err, result) => {
                                        if (err) console.log(err);
                                        else {
                                            if (result.rowCount !== 0) {
                                                console.log('vote added')
                                                res.send({ success: true })
                                            }
                                        }
                                    })
                            }
                        })

                }
            }
        })

}

module.exports = VoterController;