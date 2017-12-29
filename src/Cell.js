import React from "react";
import "./Cell.css";

function Cell(props) {
  if (!props.isWritable) {
    return (
      <div className="cell">
      </div>
    );
  }

  const gridStyle = {
    gridColumnStart: props.col + 1,
    gridRowStart: props.row + 1
  };

  return (
    <div className="cell" style={gridStyle}>
      <div className="character">{props.char}</div>
      <div className="index">{props.index}</div>
    </div>
  );
}

export default Cell;
