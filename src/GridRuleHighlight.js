import React from "react";
import { last } from "./utils";
import "./GridRuleHighlight.css";

export default function GridRuleHighlight({ selectedRule }) {
  if (!selectedRule) {
    return null;
  }

  const start = selectedRule.startPosition;
  const end = last(selectedRule.positions());

  return (
    <div
      className="highlightContainer"
      style={{
        gridRowStart: start[0] + 1,
        gridRowEnd: end[0] + 2,
        gridColumnStart: start[1] + 1,
        gridColumnEnd: end[1] + 2
      }}
    >
      <div className="highlight" />
    </div>
  );
}
