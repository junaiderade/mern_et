const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res) => { //get all the exercises
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').get(//you get the id from url this way, also this id is the unique id auto assigned in DB
    (req,res)=> {
        Exercise.findById(req.params.id)
            .then(exercise => res.json(exercise))//output exercise, study arrow functions if you want to understand these more
            .catch(err => res.status(400).json('exercises/get ' + err));
    }
)

router.route('/:id').delete(
    (req,res) => {
        Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Exercise deleted'))
            .catch(err => res.status(400).json('Error: '+err))
    }
)

router.route('/update/:id').post( //update
    (req,res) => {
        Exercise.findById(req.params.id)//you get an exercise from db and reset its attributes using the request
            .then(exercise => {
                exercise.username = req.body.username;
                exercise.description = req.body.description;
                exercise.duration = Number(req.body.duration);
                exercise.date = Date.parse(req.body.date);
                exercise.save()
                    .then(() => res.json('Exercise updated!'))
                    .catch(err => res.status(400).json('Error-routes/exercises: '+ err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    }
)

module.exports = router;