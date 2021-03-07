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

function App() {
  const [start, setStart] = useState(false);
  const graph = new Graph();

  const [isArrowsVisible, setArrowsVisible] = useState(false);

  const [playMusic] = useSound(musicTheme, { volume: 0.5 });

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
      <img
        src={`${column}${row}` !== "91" ? firehouse : idol}
        className="firehouseImg"
        id={`${column}${row}`}
      />
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
    graph.addWeights();
    console.log(graph.houses);
    return positions.map((coord, index) => (
      <div>
        {index !== positions.length - 1 ? (
          <Xarrow
            start={coord}
            end={positions[index + 1]}
            headSize={0}
            lineColor={"#4e973f"}
          />
        ) : (
          <div></div>
        )}
      </div>
    ));
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
        <div className="board">{renderTable()}</div>
        <img src={goddamnCowboy} className="indianaJones" />
      </HStack>
      {isArrowsVisible ? renderArrows() : <div></div>}
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
