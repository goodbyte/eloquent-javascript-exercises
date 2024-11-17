/*

Measuring a robot

It’s hard to objectively compare robots by just letting them solve a few
scenarios. Maybe one robot just happened to get easier tasks or the
kind of tasks that it is good at, whereas the other didn’t.
Write a function compareRobots that takes two robots (and their start-
ing memory). It should generate 100 tasks and let both of the robots
solve each of these tasks. When done, it should output the average
number of steps each robot took per task.
For the sake of fairness, make sure you give each task to both robots,
rather than generating different tasks per robot.

*/

const roads = [
  "Alice's House-Bob's House", "Alice's House-Cabin",
  "Alice's House-Post Office", "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop", "Marketplace-Farm",
  "Marketplace-Post Office", "Marketplace-Shop",
  "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
  const graph = Object.create(null);
  
  const addEdge = (from, to) => {
    if (from in graph) graph[from].push(to);
    else graph[from] = [to];
  };

  for (const [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) return this;
    
    const parcels = this.parcels
      .map((parcel) => {
        return parcel.place === this.place ? 
          { place: destination, address: parcel.address } :
          parcel;
      })
      .filter((parcel) => parcel.place !== parcel.address);

    return new VillageState(destination, parcels);
  }
}

VillageState.random = function(parcelCount = 5) {
  const parcels = [];

  const randomPlace = (placeToExclude) => {
    const places = new Set(Object.keys(roadGraph));
    if (placeToExclude) places.delete(placeToExclude);
    const rndIndex = Math.floor(Math.random() * places.size);

    return Array.from(places)[rndIndex];
  }

  for (let i = 0; i < parcelCount; i++) {
    const address = randomPlace();
    const place = randomPlace(address);
    parcels.push({ place, address });
  }

  return new VillageState('Post Office', parcels);
}

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  const work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    const { at, route } = work[i];
    
    for (const place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    const parcel = parcels[0];
    route = findRoute(
      roadGraph,
      place,
      parcel.place !== place ? parcel.place : parcel.address
    );
  }
  return { direction: route[0], memory: route.slice(1) };
}

function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length === 0) return steps;
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0;
  let total2 = 0;

  for (let i = 0; i < 100; i++) {
    const state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }

  console.log(`Robot 1 needed ${ total1 / 100 } steps per task`);
  console.log(`Robot 2 needed ${ total2 / 100 }`);
}

compareRobots(routeRobot, [], goalOrientedRobot, []);