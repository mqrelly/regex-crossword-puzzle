import React from "react";
import { RuleDirection } from "./Rule.js";
import "./RuleList.css";

function RuleItem({ rule, isHighlighted }) {
  const key = `${rule.startIndex}${
    rule.direction === RuleDirection.Horizontal ? "⇨" : "⇩"
  }`;

  return (
    <span className={isHighlighted ? "highlighted" : ""}>
      <span className="key">{key}</span>
      <span className="pattern">{rule.pattern.toSource()}</span>
    </span>
  );
}

function RuleList({ rules, selectedRuleId }) {
  return (
    <ul className="ruleList">
      {rules.map(r => (
        <li key={r.id}>
          <RuleItem rule={r} isHighlighted={r.id === selectedRuleId} />
        </li>
      ))}
    </ul>
  );
}

export default RuleList;
