const connectedComponentsCount = (graph) => {
  const visited = new Set();
  let count = 0;

  for (const node in graph) {
    if (explore(graph, node, visited)) count++;
  }

  return count;
};

const explore = (graph, current, visited) => {
  if (visited.has(String(current))) return false;

  visited.add(String(current));

  for (const neighbor of graph[current]) {
    explore(graph, neighbor, visited);
  }

  return true;
};

connectedComponentsCount({
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
}); 
// -> 2