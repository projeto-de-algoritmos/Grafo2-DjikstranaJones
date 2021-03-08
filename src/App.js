import "./App.css";
import { useState, setState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import indianaJones from "./assets/indianaJones.png";
import goddamnCowboy from "./assets/goddamnCowboy.png";
import firehouse from "./assets/firehouse.png";
import idol from "./assets/idol.png";
import Xarrow from "react-xarrows";
import Graph from "./utils/Graph";
import musicTheme from "./assets/musicTheme.mp3";
import useSound from "use-sound";
import checkArray from './utils/checkArray.js';

function App() {
  const [start, setStart] = useState(false);
  const [gameIsEnd, setGameIsEnd] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [userLose, setUserLose] = useState(false);
  const graph = new Graph();
  graph.addWeights();
  const dijkstra = graph.dijkstra();
  console.log(graph.houses);

  const [isArrowsVisible, setArrowsVisible] = useState(false);

  const [playMusic] = useSound(musicTheme, { volume: 0.0 });

  let positions = [
    "01",
    "10",
    "11",
    "12",
    "31",
    "42",
    "50",
    "51",
    "70",
    "81",
    "91",
  ];

  const renderColumn = (row) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
      <div>
        {positions.includes(`${column}${row}`)
          ? renderImg(column, row)
          : renderField(column, row)}
      </div>
    ));
  };

  const renderImg = (column, row) => {
    return (
      <div className="firehouseContainer" onClick={() => {
        // checkArray(column, row, )
        // console.log(dijkstra);
      }}>
        <img
          src={`${column}${row}` !== "91" ? firehouse : idol}
          id={`${column}${row}`}
          className="firehouseImg"
        />
      </div>
    );
  };

  const renderField = (column, row) => {
    return (
      <div
        className={"field"}
        id={`t${column},${row}`}
        key={`${column},${row}`}
      ></div>
    );
  };

  const renderTable = () => {
    return [0, 1, 2].map((row, index) => (
      <div className="cross" key={index}>
        {renderColumn(row)}
      </div>
    ));
  };

  const renderArrows = () => {
    let cont = 0;
    return positions.map((coord) => {
      cont = 0;
      return Object.keys(graph.houses[coord]).map((neighbor, index) => {
        cont++;
        let start =
          cont === 1
            ? "right"
            : cont === 2
            ? "top"
            : cont === 3
            ? "bottom"
            : "left";
        let end = "auto";
        return (
          <div>
            <Xarrow
              start={coord}
              end={neighbor}
              startAnchor={{ position: start }}
              endAnchor={{ position: end }}
              strokeWidth={2.5}
              curveness={0.2}
              label={{
                start: (
                  <div>
                    <p className="labelArrow">{`${
                      Object.values(graph.houses[coord])[index]
                    }`}</p>
                  </div>
                ),
              }}
              headSize={0}
              lineColor={"#4e973f"}
              // dashness={{ strokeLen: 10, nonStrokeLen: 15, animation: -2 }}
            />
          </div>
        );
      });
    });
  };

  return (
    <div className="app">
      <Text fontSize="4xl" fontWeight="bold" color="#54331d" mb="25px">
        Ajude Dijkstrana Jones a roubar o tesouro dos bandidos
      </Text>
      <Text fontSize="lg" textAlign="center" px="25%" color="#54331d">
        Dijkstrana Jones está em uma cidade deserta, aniquilada por saqueadores.
        Os bandidos destruíram todas as casas em busca do ídolo perdido. E nosso
        herói, Dijkstrana Jones, sabe exatamente onde o ídolo perdido está
        escondido, porém não sabe qual é o melhor caminho até o tesouro.
      </Text>
      <Text fontSize="lg" textAlign="center" px="25%" color="#54331d" mb="25px">
        É uma corrida contra o tempo até que os bandidos encontrem o ídolo,
        ajude nosso herói a chegar ao tesouro e escapar são e salvo.
      </Text>
      <HStack className="horizontalBox">
        <img src={indianaJones} className="indianaJones" />
        {
          gameIsEnd?
          (
            userWon?
            <img src="https://i.gifer.com/4o8.gif"/>
            :
            <img src="https://i.pinimg.com/originals/bf/47/a9/bf47a9ef02a8040f7697e63afface03e.gif"/>
          )
          :
        <div className="board">
          {isArrowsVisible ? renderArrows() : <div></div>}
          {renderTable()}
        </div>
        }
        <img src={goddamnCowboy} className="indianaJones" />
      </HStack>
      <HStack mt="10px">
        <Button
          onClick={() => {
            setArrowsVisible(true);
            playMusic();
            setStart(true);
          }}
          disabled={start}
          bg="yellow.300"
        >
          Start
        </Button>
        <Button onClick={() => window.location.reload()} bg="yellow.300">
          Reset
        </Button>
      </HStack>
    </div>
  );
}

export default App;
