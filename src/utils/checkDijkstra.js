const checkDijkstra = (column, row, dijkstra, index) =>{
console.log("abc ", index);
    console.log(`${column}${row}`, dijkstra[index]);
    return `${column}${row}` === dijkstra[index];
}

export default checkDijkstra;