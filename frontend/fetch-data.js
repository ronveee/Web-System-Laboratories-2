const menu = document.querySelector('tbody');

// Fetch all workout data from the server
const getData = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/workouts");
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Failed to fetch data:", err);
    }
};

// Create a row for each workout entry
const createRow = (workout, index) => {
    const tr = document.createElement('tr');

    const noTd = document.createElement('td');
    const titleTd = document.createElement('td');
    const repsTd = document.createElement('td');
    const loadTd = document.createElement('td');
    const actionTd = document.createElement('td');

    // Use the index for the "No." column
    noTd.innerText = index + 1;

    titleTd.innerText = workout.title;
    repsTd.innerText = workout.reps;
    loadTd.innerText = workout.load;

    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    editButton.classList.add('btn', 'btn-primary', 'bi', 'bi-pen');
    editButton.setAttribute('data-bs-toggle', 'modal');
    editButton.setAttribute('data-bs-target', '#editWorkoutModal');
    editButton.onclick = () => populateEditForm(workout);

    deleteButton.classList.add('btn', 'btn-danger', 'bi', 'bi-trash');
    deleteButton.onclick = () => confirmDelete(workout.title);

    actionTd.append(editButton, deleteButton);

    tr.append(noTd, titleTd, repsTd, loadTd, actionTd);
    return tr;
};

// Populate the form with data to edit
const populateEditForm = (workout) => {
    document.getElementById('editWorkoutTitle').value = workout.title;
    document.getElementById('editWorkoutReps').value = workout.reps;
    document.getElementById('editWorkoutLoad').value = workout.load;
};

// Add new workout functionality
document.getElementById('addWorkoutForm').onsubmit = async (e) => {
    e.preventDefault();

    const newWorkout = {
        title: document.getElementById('workoutTitle').value,
        reps: parseInt(document.getElementById('workoutReps').value),
        load: parseInt(document.getElementById('workoutLoad').value),
    };

    try {
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWorkout),
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Workout Added!",
                text: "Your new workout has been successfully added.",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(() => {
                document.getElementById('addWorkoutForm').reset();
                window.location.reload();
            });
        } else {
            const errorText = await response.text();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to add workout. ${errorText}`,
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while adding the workout.",
        });
        console.error(err);
    }
};

// Edit workout functionality
document.getElementById('editWorkoutForm').onsubmit = async (e) => {
    e.preventDefault();

    const updatedWorkout = {
        title: document.getElementById('editWorkoutTitle').value,
        reps: parseInt(document.getElementById('editWorkoutReps').value),
        load: parseInt(document.getElementById('editWorkoutLoad').value),
    };

    try {
        const response = await fetch(`http://localhost:3000/api/workouts/${updatedWorkout.title}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedWorkout),
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Workout Updated!",
                text: "The workout has been successfully updated.",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(() => {
                window.location.reload();
            });
        } else {
            const errorText = await response.text();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Failed to update workout. ${errorText}`,
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while updating the workout.",
        });
        console.error(err);
    }
};

// Handle deletion confirmation with SweetAlert2
const confirmDelete = (title) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the workout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:4000/api/workouts/${title}`, { method: 'DELETE' });

                if (response.ok) {
                    Swal.fire({
                        icon: "success",
                        title: "Workout Deleted!",
                        text: "The workout has been successfully deleted.",
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    const errorText = await response.text();
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: `Failed to delete workout. ${errorText}`,
                    });
                }
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while deleting the workout.",
                });
                console.error(err);
            }
        }
    });
};

// Load workout data and display it
getData()
    .then((workouts) => {
        if (workouts) {
            workouts.forEach((workout, index) => {
                menu.append(createRow(workout, index));
            });
        }
    })
    .catch((err) => {
        console.error("Error loading workouts:", err);
    });