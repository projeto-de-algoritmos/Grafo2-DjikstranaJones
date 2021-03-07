
import './App.css';
import {useState, setState} from 'react';
import indianaJones from './assets/indianaJones.png';
import firehouse from './assets/firehouse.png';
import Xarrow from "react-xarrows";
import Graph from './Utils/Graph';

let positions = ["01", "10", "11", "12", "31", "42", "50", "51", "70", "81", "91"];


const renderColumn = (row) => {
  return [0, 1, 2, 3, 4, 5, 6, 7,8,9].map((column) => (
<div>
  {positions.includes(`${column}${row}`)?  renderImg(column, row) : renderField(column, row)}
</div>
  
  ));
};

const renderImg = (column, row) => {
  return  <img src={firehouse} className="firehouseImg" id={`${column}${row}`}/>
}

const renderField = (column, row) =>{
  return <div
    className={"field"}
    id={`t${column},${row}`}
    key={`${column},${row}`}
  >
  </div>

}
const renderTable = () => {
  return [0, 1, 2].map((row, index) => (
    <div className="cross" key={index}>
      {renderColumn(row)}
    </div>
  ));
};

const renderArrows = () => {
  const graph = new Graph();
  graph.addWeights();
  console.log(graph.houses);
  return positions.map((coord, index)=> (
<div>
  {index != positions.length-1?
    <Xarrow start={coord} end={positions[index+1]} headSize={0} lineColor={"#4e973f"}/> : <div></div>
  }
</div>
  ))
}


function App() {
  const [isArrowsVisible, setArrowsVisible] = useState(false);
  return (
    <div className="app">
      <p className="title">Ajude Dijkstrana Jones a salvar a Princesa</p>
      <img src="https://i.pinimg.com/originals/bf/47/a9/bf47a9ef02a8040f7697e63afface03e.gif"/>
      <div className="board">
        {renderTable()}
      </div>
        {isArrowsVisible? renderArrows() : <div></div>}
        <button onClick={()=>setArrowsVisible(true)}>Press me</button>
    </div>
  );
}

export default App;
