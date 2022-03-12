import firebase from '../Firebase';

export function addWorkout(workout, addComplete){
    firebase.firestore()
    .collection('WorkoutDay')
    .add({
        id: workout.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getWorkouts(workoutsRetreived){

    var workoutList = [];

    var snapshot = await firebase.firestore()
    .collection('WorkoutDay')
    .orderBy('createdAt')
    .get()

    snapshot.forEach((doc) => {
        workoutList.push(doc.data())
    });

    workoutsRetreived(workoutList);
}