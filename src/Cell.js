import React from "react";
import "./Cell.css";

function Cell(props) {
  if (!props.isWritable) {
    return <div className="cell" />;
  }

  const gridStyle = {
    gridColumnStart: props.col + 1,
    gridRowStart: props.row + 1
  };

  return (
    <div className="cell" style={gridStyle}>
      <div className={props.isFocused ? "input focused" : "input"}>
        <span className="character">{props.char}</span>
        <div className="index">{props.index}</div>
      </div>
      {props.isInvalid ? <div className="invalid" /> : null}
    </div>
  );
}

export default Cell;
