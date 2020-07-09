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
        "DROP TABLE if exists pets; CREATE TABLE pets(id int auto_increment, primary key(id), petname varchar(40) not null, petimg varchar(400) default 'https://webstockreview.net/images/footprint-clipart-pink-9.png' null, pettype_id int not null);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `pets` was successful!");
    });

    sql =
        "INSERT INTO pets (id, petname, petimg, pettype_id) VALUES (1, 'Rex', 'https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1); ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Insert for `pets` was successful!");

    });


    sql =
        "DROP TABLE if exists fedcheckbox; CREATE TABLE fedcheckbox(id INT NOT NULL AUTO_INCREMENT, pet_id INT NOT NULL, Monday BOOLEAN, Tuesday BOOLEAN, Wednesday BOOLEAN, Thursday BOOLEAN,Friday BOOLEAN, Saturday BOOLEAN, Sunday BOOLEAN, PRIMARY KEY (id));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `fedcheckbox` was successful!");

    });

    sql = "INSERT INTO fedcheckbox(pet_id, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) VALUES(1,0,0,0,0,0,0,0);";
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log("Insert for `fedcheckox`was successful!");
    });

    sql =
        "DROP TABLE if exists pettype; CREATE TABLE pettype(id INT NOT NULL AUTO_INCREMENT, pet_type VARCHAR(40) NOT NULL, PRIMARY KEY (id));";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `pettype` was successful!");

    });
    sql =
        "INSERT INTO pettype (id, pet_type) VALUES (1, 'Cat');" +
        "INSERT INTO pettype (id, pet_type) VALUES (2, 'Dog');" +
        "INSERT INTO pettype (id, pet_type) VALUES (3, 'Hedgehog');" +
        "INSERT INTO pettype (id, pet_type) VALUES (4, 'Oceanic');" +
        "INSERT INTO pettype (id, pet_type) VALUES (5, 'Birds');" +
        "INSERT INTO pettype (id, pet_type) VALUES (6, 'Reptiles ');" +
        "INSERT INTO pettype (id, pet_type) VALUES (7, 'Exotics');" +
        "INSERT INTO pettype (id, pet_type) VALUES (8, 'Others');"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Insert for `pettype` was successful!");

    });

    sql =
        "DROP TABLE IF EXISTS users; CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NULL, email VARCHAR(200) NOT NULL, password VARCHAR(200) NOT NULL, refresh_token VARCHAR(500) NULL);";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table creation `users` was successful!");
    });
    
    console.log("Closing...");
    con.end();
});
