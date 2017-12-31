import { createMap } from "./utils";
import React from "react";
import Cell from "./Cell";
import "./Grid.css";

function Grid({
  rows,
  cols,
  cellSize,
  ruleMap,
  chars,
  focusedCellId,
  onFocusChanged,
  onKeyDown
}) {
  const grid = createMap(rows, cols, (i, j) => {
    const id = i * cols + j;
    const index = ruleMap[i][j].some(r => r.charPos === 0) ? id + 1 : null;

    return (
      <Cell
        key={id}
        index={index}
        row={i}
        col={j}
        isWritable={ruleMap[i][j].length > 0}
        isFocused={id === focusedCellId}
        char={chars[i][j]}
      />
    );
  });

  const gridStyle = {
    width: `${cols * cellSize}px`,
    height: `${rows * cellSize}px`
  };

  return (
    <div
      className="grid"
      style={gridStyle}
      tabIndex="0"
      onKeyDown={onKeyDown}
      onFocus={() => onFocusChanged({ gained: true })}
      onBlur={() => onFocusChanged({ gained: false })}
    >
      {grid}
    </div>
  );
}

export default Grid;
