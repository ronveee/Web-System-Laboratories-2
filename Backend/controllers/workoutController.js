const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  // add to the database
  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a workout by title
const deleteWorkout = async (req, res) => {
  const { title } = req.params;

  try {
    const workout = await Workout.findOneAndDelete({ title });

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json({
      message: 'Workout deleted successfully',
      workout: workout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a workout by title
const updateWorkout = async (req, res) => {
  const { title } = req.params;
  const { load, reps } = req.body;

  try {
    const workout = await Workout.findOneAndUpdate(
      { title },
      { $set: { load, reps } },
      { new: true, runValidators: true }
    );
    
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json({
      message: 'Workout updated successfully',
      workout: workout,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}