require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1",
    user: DB_USER || "root",
    password: DB_PASS,
    database: DB_NAME || "pet_tracker",
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    let sql =
        "DROP TABLE if exists pets; CREATE TABLE pets(id INT NOT NULL AUTO_INCREMENT, petname VARCHAR(40) not null, PRIMARY KEY (id));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `pets` was successful!");


        sql =
            "DROP TABLE if exists fedcheckbox; CREATE TABLE fedcheckbox(id INT NOT NULL AUTO_INCREMENT, pet_id INT NOT NULL, Monday BOOLEAN, Tuesday BOOLEAN, Wednesday BOOLEAN, Thursday BOOLEAN,Friday BOOLEAN, Saturday BOOLEAN, Sunday BOOLEAN, PRIMARY KEY (id));";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table creation `fedcheckbox` was successful!");

            console.log("Closing...");
    });

    con.end();
});
