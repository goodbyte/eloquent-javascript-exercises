/*

Robot efficiency

Can you write a robot that finishes the delivery task faster than goalOriented
? If you observe that robot’s behavior, what obviously stupid things
does it do? How could those be improved?
If you solved the previous exercise, you might want to use your
compareRobots function to verify whether you improved the robot.

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

function runRobot(state, robot, memory = []) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);    
  }
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

function lazyRobot({ place, parcels }, route) {
  if (route.length === 0) {
    // Describe a route for every parcel
    const routes = parcels.map((parcel) => {
      return parcel.place === place ?
        { route: findRoute(roadGraph, place, parcel.address), pickUp: false } :
        { route: findRoute(roadGraph, place, parcel.place ), pickUp: true };
    });
    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    const score = ({ route, pickUp }) => (pickUp ? 0.5 : 0) - route.length;
    
    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }
  return { direction: route[0], memory: route.slice(1) };
}

runRobot(VillageState.random(), lazyRobot, []);


