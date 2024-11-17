const largestComponent = (graph) => {
  const visited = new Set();
  let longest = 0;

  for (const node in graph) {
    const size = exploreSize(graph, node, visited);
    if (size > longest) longest = size;
  }

  return longest;
};

const exploreSize = (graph, node, visited) => {
  if (visited.has(String(node))) return 0;

  visited.add(String(node));

  let size = 1;

  for (const neighbor of graph[node]) {
    size += exploreSize(graph, neighbor, visited);
  }

  return size;
};

largestComponent({
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
});
// -> 4