import React from "react";
import { RuleDirection } from "./Rule.js";
import "./RuleList.css";

function RuleListItem({ rule, isValid, isHighlighted }) {
  const key = `${rule.startIndex}${
    rule.direction === RuleDirection.Horizontal ? "⇨" : "⇩"
  }`;
  let classes = ["ruleListItem"];
  if (typeof isValid === "boolean") {
    classes.push(isValid ? "valid" : "invalid");
  }
  if (isHighlighted) {
    classes.push("highlighted");
  }

  return (
    <span className={classes.join(" ")}>
      <span className="key">{key}</span>
      <span className="pattern">{rule.pattern.toSource()}</span>
    </span>
  );
}

function RuleList({ rules, ruleStates, selectedRuleId }) {
  return (
    <ul className="ruleList">
      {rules.map(r => (
        <li key={r.id}>
          <RuleListItem
            rule={r}
            isValid={ruleStates[r.id]}
            isHighlighted={r.id === selectedRuleId}
          />
        </li>
      ))}
    </ul>
  );
}

export default RuleList;
