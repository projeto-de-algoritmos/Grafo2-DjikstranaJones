const checkDijkstra = (column, row, dijkstra, index) =>{
    return `${column}${row}` === dijkstra[index];
}

export default checkDijkstra;