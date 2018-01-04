import React from "react";
import { RuleDirection } from "./Rule";
import "./RuleListItem.css";

function RuleListItem({ rule, isValid, isHighlighted, onClick }) {
  const key = rule.direction === RuleDirection.Horizontal ? "▶" : "▼";

  let classes = ["ruleListItem"];
  if (typeof isValid === "boolean") {
    classes.push(isValid ? "valid" : "invalid");
  }
  if (isHighlighted) {
    classes.push("highlight");
  }

  return (
    <span className={classes.join(" ")} onClick={() => onClick(rule.id)}>
      <span className="key">{rule.startIndex} {key}</span>
      <span className="pattern">{rule.pattern.toSource()}</span>
    </span>
  );
}

export default RuleListItem;
