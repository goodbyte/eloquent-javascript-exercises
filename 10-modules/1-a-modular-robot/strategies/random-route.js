function randomPick(arr) {
  let choice = Math.floor(Math.random() * arr.length);
  return arr[choice];
}

export function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}