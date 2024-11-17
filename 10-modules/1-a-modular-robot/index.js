/*

A modular robot

These are the bindings that the project from Chapter 7 creates:

roads
buildGraph
roadGraph
VillageState
runRobot
randomPick
randomRobot
mailRoute
routeRobot
findRoute
goalOrientedRobot

If you were to write that project as a modular program, what modules
would you create? Which module would depend on which other module,
and what would their interfaces look like?
Which pieces are likely to be available prewritten on NPM? Would
you prefer to use an NPM package or write them yourself?

*/

import { VillageState } from './village-state.js';
import { randomRobot } from './strategies/random-route.js';
import { routeRobot } from './strategies/fixed-route.js';
import { goalOrientedRobot } from './strategies/goal-oriented-route.js';

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

// runRobot(VillageState.random(), randomRobot);
// runRobot(VillageState.random(), routeRobot);
runRobot(VillageState.random(), goalOrientedRobot);