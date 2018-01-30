import { createMap } from "./utils";
import React from "react";
import Cell from "./Cell";
import GridRuleHighlight from "./GridRuleHighlight";
import "./Grid.css";

function Grid({
  rows,
  cols,
  ruleMap,
  ruleStates,
  chars,
  selectedRule,
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

  return (
    <div className="gridContainer">
      <div
        className="grid"
        tabIndex="0"
        onKeyDown={onKeyDown}
        onFocus={() => onFocusChanged({ gained: true })}
        onBlur={() => onFocusChanged({ gained: false })}
        ref={elem => onElementSet(elem)}
      >
        {grid}
        <GridRuleHighlight selectedRule={selectedRule} />
      </div>
      </div>
  );
}

export default Grid;
