import { roadGraph } from '../adjacent-list.js';

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

export function goalOrientedRobot({ place, parcels }, route) {
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