import { createMap } from "./utils";
import React from "react";
import Cell from "./Cell";
import "./Grid.css";

function Grid(props) {
  const grid = createMap(props.rows, props.cols, (i, j) => {
    const key = i * props.cols + j;
    const index = props.ruleMap[i][j].some(r => r.charPos === 0)
      ? key + 1
      : null;

    return (
      <Cell
        key={key}
        index={index}
        row={i}
        col={j}
        isWritable={props.ruleMap[i][j].length > 0}
        char={props.chars[i][j]}
      />
    );
  });

  const gridStyle = {
    width: `${props.cols * props.cellSize}px`,
    height: `${props.rows * props.cellSize}px`
  };

  return (
    <div className="grid" style={gridStyle}>
      {grid}
    </div>
  );
}

export default Grid;
