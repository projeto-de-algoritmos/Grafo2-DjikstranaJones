
import './App.css';
import indianaJones from './assets/indianaJones.png';
import firehouse from './assets/firehouse.png';

const renderColumn = (row) => {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((column) => (
    <div
      border="1px"
      className={"field"}
      id={`t${column},${row}`}
      key={`${column},${row}`}
    ></div>
  ));
};

const renderTable = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7].map((column, index) => (
    <div className="cross" key={index}>
      {renderColumn(column)}
    </div>
  ));
};


function App() {
  return (
    <div className="app">
      <p className="title">Ajude Dijkstrana Jones a salvar a Princesa</p>
      <img src="https://i.pinimg.com/originals/bf/47/a9/bf47a9ef02a8040f7697e63afface03e.gif"/>
      <img src={indianaJones}/>
      <img src={firehouse}/>
      <div className="board">
        {renderTable()}
      <div></div>
      </div>
    </div>
  );
}

export default App;
