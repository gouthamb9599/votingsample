const { Client } = require("pg");

const client = new Client({
    user: "reflect",
    password: "reflect123",
    host: "localhost",
    port: 5432,
    database: "testingengine"
});
client.connect().then(() => console.log("connected database"));
module.exports = client;