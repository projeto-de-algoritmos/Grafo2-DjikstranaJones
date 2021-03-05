import Node from "./Node";
export default class Graph {
  constructor() {
    this.nodes = new Map();
    this.neighbor = new Map();
  }

  addNode() {
    let nodePhrase = "";
    for (let i = 0; i < this.column; i++) {
      for (let j = 0; j < this.row; j++)
        nodePhrase += i.toString() + "," + j.toString() + " ";
    }
    nodePhrase = nodePhrase.split(" ");
    nodePhrase.map((node) => this.nodes.set(node, new Node(node)));
  }

  addNeighbor() {
    for (let i = 0; i < this.column; i++)
      for (let j = 0; j < this.row; j++) {
        let neighbor = [];
        if (j < this.column - 1) neighbor.push(`${i},${j + 1}`);
        if (j > 0) neighbor.push(`${i},${j - 1}`);
        if (i > 0) neighbor.push(`${i - 1},${j}`);
        if (i < this.row - 1) neighbor.push(`${i + 1},${j}`);
        this.neighbor.set(`${i},${j}`, neighbor);
      }
  }

}