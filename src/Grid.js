import { createMap } from "./utils";
import React from "react";
import Cell from "./Cell";
import "./Grid.css";

function Grid({
  rows,
  cols,
  cellSize,
  ruleMap,
  ruleStates,
  chars,
  focusedCellId,
  onFocusChanged,
  onKeyDown,
  onCellClick,
  onElementSet = () => {}
}) {
  const grid = createMap(rows, cols, (i, j) => {
    const id = i * cols + j;
    const rules = ruleMap[i][j];
    const index = rules.some(r => r.charPos === 0) ? id + 1 : null;
    const isInvalid = rules.some(r => ruleStates[r.rule.id] === false);

    return (
      <Cell
        key={id}
        index={index}
        row={i}
        col={j}
        isWritable={ruleMap[i][j].length > 0}
        isInvalid={isInvalid}
        isFocused={id === focusedCellId}
        char={chars[i][j]}
        onClick={() => onCellClick(id, i, j)}
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
      ref={elem => onElementSet(elem)}
    >
      {grid}
    </div>
  );
}

export default Grid;
