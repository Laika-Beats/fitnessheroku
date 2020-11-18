const db = require("../models");
let WorkoutModel = require("../models/Workout.js")

module.exports = function (app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                console.log("error")
                res.send(err)
            })
    });
    
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find().sort({day: -1}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log("error")
            res.send(err)
        })
    
    });
    
    app.post("/api/workouts", (req, res) => {
        let workout = new WorkoutModel({})
        WorkoutModel.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
            .catch(err => {
                console.log("error")
                res.send(err)
            })
    });
    
    app.put("/api/workouts/:id", (req, res) => {
        WorkoutModel.findByIdAndUpdate(
            {_id: req.params.id},
            {$push: {exercises: req.body}},
            {new: true}
        )
        .then((dbWorkout) => {
            if (dbWorkout) {
                res.json(dbWorkout)
            } else {
                console.log("error")
                res.send(err)
            }
        })
        .catch(err => {
            console.log("error")
            res.send(err)
        })
    });
    
    app.delete("/api/workouts/:id", (req, res) => {
        WorkoutModel.findOneAndRemove(
            {_id: req.params.id}
        )
        .then((dbWorkout) => {
            if (dbWorkout) {
                res.send("Workout deleted.")
            } else {
                console.log("error")
                res.send(err)
            }
        })
        .catch(err => {
            console.log("error")
            res.send(err)
        })
    });
}