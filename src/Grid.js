import React from "react";
import Cell from "./Cell";
import "./Grid.css";

function Grid(props) {
  const grid = new Array(props.rows);
  for (let i = 0; i < props.rows; i += 1) {
    grid[i] = new Array(props.cols);
    for (let j = 0; j < props.cols; j += 1) {
      const idx = i * props.cols + j;
      grid[i][j] = (<Cell
        key={idx}
        index={idx}
        row={i}
        col={j}
        isWritable={true}
        char={props.chars[i][j]} />);
    }
  }

  const gridStyle = {
    width: `${props.cols * 60}px`,
    height: `${props.rows * 60}px`
  };

  return (<div className="grid" style={gridStyle}>{grid}</div>);
}

export default Grid;
