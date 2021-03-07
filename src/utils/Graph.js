export default class Graph {
  constructor() {
    this.houses = {};
  }

  addWeights() {
    const edges = [
      { 10: 0, 11: 0, 12: 0 }, //01
      {  31: 0, 12: 0, 50: 0}, //10
      {  31: 0 }, //11
      { 10:0,31: 0, 42: 0 }, //12
      { 42: 0, 50: 0, 51: 0 }, //31
      {50:0, 70: 0, 81: 0 }, //42
      { 51: 0, 70: 0 },//50
      { }, //51
      { 81: 0, 91: 0 }, //70
      { 91: 0 }, // 81
      {},
    ];
    const nodes = "01 10 11 12 31 42 50 51 70 81 91".split(" ");
    const weights = [];
    edges.forEach((e, index) => {
      let neighbor = {};
      const key = Object.keys(e);
      weights.push(Object.values(e).map(() => Math.ceil(Math.random() * 10)));
      weights[index].forEach((x, i) => {
        neighbor[key[i]] = x;
      });
      this.houses[nodes[index]] = neighbor;
      neighbor = {};
    });
  }

  getMinimalNode = (weights, processed) => {
    const knownNodes = Object.keys(weights);

    const lowestWeightNode = knownNodes.reduce((lowest, node) => {
      if (lowest === null && !processed.includes(node)) {
        lowest = node;
      }
      if (weights[node] < weights[lowest] && !processed.includes(node)) {
        lowest = node;
      }
      return lowest;
    });

    return lowestWeightNode;
  };

  dijkstra = () => {
    const weights = Object.assign({ 91: Infinity }, this.houses["01"]);
    const parents = { 91: null };
    for (let child in this.houses["01"]) {
      parents[child] = "01";
    }

    const processed = [];
    let node = this.getMinimalNode(weights, processed);

    while (node) {
      let weight = weights[node];
      let children = this.houses[node];
      for (let n in children) {
        let newWeight = weight + children[n];
        if (!weights[n] || weights[n] > newWeight) {
          weights[n] = newWeight;
          parents[n] = node;
        }
      }
      processed.push(node);
      node = this.getMinimalNode(weights, processed);
    }

    let betsPath = ["91"];
    let parent = parents["91"];

    while (parent) {
      betsPath.unshift(parent);
      parent = parents[parent];
    }
    console.log({
      distance: weights["91"],
      path: betsPath,
    });
    return {
      distance: weights["91"],
      path: betsPath,
    };
  };

  getGraph() {
    return this.houses;
  }
}
