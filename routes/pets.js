var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//GET list of pets
router.get('/', function (req, res, next) {
    db(`SELECT * FROM pets INNER JOIN pettype ON pets.pettype_id = pettype.id;`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => res.status(500).send(err))
});

//GET all pet type
router.get('/pettype', function (req, res, next) {
    db(`SELECT * FROM pettype;`)
        .then(result => {
            res.send(result.data)
        })
        .catch(err => res.status(500).send(err))
});

//GET a specific pet
// router.get('/:id',function(req, res, next) {
//     db(`SELECT * FROM pets WHERE id=${req.params.id};`)
//         .then(result => {
//             res.send(result.data[0])
//         })
//         .catch(err => res.status(500).send(err))
// });

//CREATE new pet
router.post("/createpet", (req, res, next) => {
    const query = `
    INSERT INTO pets (petname, petimg, pettype_id)
    VALUES (
        '${req.body.petname}',
        ${req.body.petimg ? `'${req.body.petimg}'` : "DEFAULT"},
        '${req.body.pettype_id}'
    );
    `;

    db(query)
        .then(results => {
            if (results.error) {
                res.status(404).send({error: results.error});
            } else {
                res
                    .status(200)
                    .send({msg: `${req.body.petname} created!`})
                    .catch(error => res.status(500).send(error));
            }
        })
        .catch(error => {
            console.error("ERROR:", error);
            res.status(500).send(error)
        });
});

//GET checkbox for a pet
//just GET EVERYTHING from table
router.get('/:id', function (req, res, next) {
    db(`SELECT * FROM fedcheckbox INNER JOIN pets ON fedcheckbox.pet_id = pets.id WHERE pet_id = ${req.params.id};`)
        .then(result => {
            console.log(result);
            res.send({
                pet_id: result.data[0].pet_id,
                petname: result.data[0].petname,
                days: {
                    Monday: result.data[0].Monday,
                    Tuesday: result.data[0].Tuesday,
                    Wednesday: result.data[0].Wednesday,
                    Thursday: result.data[0].Thursday,
                    Friday: result.data[0].Friday,
                    Saturday: result.data[0].Saturday,
                    Sunday: result.data[0].Sunday
                }
            })
            //  res.send(result.data[0])

        })
        .catch(err => res.status(500).send(err))
});

// UPDATE checkbox for specific pet

//do this TO BE SAFE, so users can't modify
const dayToColumn = {
    Monday: `Monday`,
    Tuesday: `Tuesday`,
    Wednesday: `Wednesday`,
    Thursday: `Thursday`,
    Friday: `Friday`,
    Saturday: `Saturday`,
    Sunday: `Sunday`,
}
//Need a solid route
router.put("/update/:id/:day", (req, res, next) => {

    const column = dayToColumn[req.params.day];

    //To be safe, so other people can't simply modify it
    // db(`UPDATE fedcheckbox SET ? = !? WHERE id =?;`,[column, column, req.params.id])
    db(`UPDATE fedcheckbox SET ${column} = !${column} WHERE id= ${req.params.id};`)
        //don't need var but still need the result, putting a var gives an error cuz not using it anywhere.
        .then(() => {
            db(`SELECT * FROM fedcheckbox WHERE id =${req.params.id};`)
                .then(result => {
                    res.send({
                        Monday: result.data[0].Monday,
                        Tuesday: result.data[0].Tuesday,
                        Wednesday: result.data[0].Wednesday,
                        Thursday: result.data[0].Thursday,
                        Friday: result.data[0].Friday,
                        Saturday: result.data[0].Saturday,
                        Sunday: result.data[0].Sunday
                    });
                })
            //return res.send(result.data)
            //res.status(200).send('Fed for today')
        })
        .catch(err => res.status(500).send(err));
})

//reset checkbox
//Initially can't use put due to conflict (changed it to update/...)
router.put("/reset/:id", (req, res, next) => {
    db(`UPDATE fedcheckbox SET Monday = 0, Tuesday = 0, Wednesday = 0, Thursday = 0, Friday = 0, Saturday = 0, Sunday = 0 WHERE id =${req.params.id};`)
        .then(result => {
            res.send({ok: true})
        })
})

module.exports = router;
