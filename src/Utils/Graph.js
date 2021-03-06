export default class Graph {
  constructor() {
    this.houses = {};
  }

  addWeights() {
    const edges = [
      { A: 0, B: 0, C: 0 },
      { C: 0, D: 0, E: 0 },
      { A: 0, D: 0 },
      { D: 0, G: 0 },
      { E: 0, F: 0, G: 0 },
      { H: 0, G: 0 },
      { G: 0, E: 0 },
      { I: 0, finish: 0 },
      { I: 0, finish: 0 },
      { finish: 0 },
      {},
    ];
    const nodes = "start A B C D E F G H I finish".split(" ");
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

  getGraph() {
    return this.houses;
  }
}
