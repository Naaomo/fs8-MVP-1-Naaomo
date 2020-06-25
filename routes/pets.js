var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET the list of pets?(necessary?) */
router.get('/', function (req, res, next) {
    db(`SELECT *
        FROM pets;`)
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


//GET checkbox for a pet
//just GET EVERYTHING from table
router.get('/:id', function (req, res, next) {
    db(`SELECT * FROM fedcheckbox INNER JOIN pets ON fedcheckbox.pet_id = pets.id WHERE pet_id = ${req.params.id};`)
        .then(result => {
            //TODO ASK WHY NOT WORKING
            // res.send({
            //     pet_id : result.data[0].pet_id,
            //     petname : result.data[0].petname,
            //     // days: {
            //     //     day1: result.data[0].DAY1,
            //     //     day2: result.data[0].DAY2,
            //     //     day3: result.data[0].DAY3,
            //     //     day4: result.data[0].DAY4,
            //     //     day5: result.data[0].DAY5,
            //     //     day6: result.data[0].DAY6,
            //     //     day7: result.data[0].DAY7
            //     // }
            // })
            res.send(result.data[0])

        })
        .catch(err => res.status(500).send(err))
});

// UPDATE checkbox for specific pet
// Update the days one by one?
// if all checked???
router.put("/:id", (req, res) => {
    db(`UPDATE fedcheckbox SET Day1 = !Day1 WHERE id='${req.params.id}';`)
        .then(result => {
            res.send(result.data);
            //return res.send(result.data)
            //res.status(200).send('Fed for today')
        })
        .catch(err => res.status(500).send(err));
})


module.exports = router;
