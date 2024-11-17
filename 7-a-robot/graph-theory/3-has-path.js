const hasPath = (graph, src, dst) => {
  if (src === dst) return true;

  for (const neighbor of graph[src]) {
    if (hasPath(graph, neighbor, dst)) return true;
  }

  return false;
};

const hasPathBreadthFirst = (graph, src, dst) => {
  const queue = [ src ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === dst) return true;
    for (const neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }

  return false;
};

const graph = {
  f: ['g', 'i'],
  g: ['h'],
  h: [],
  i: ['g', 'k'],
  j: ['i'],
  k: [],
};

hasPath(graph, 'f', 'k');
// -> true