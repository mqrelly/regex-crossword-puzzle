import React from "react";
import RuleListItem from "./RuleListItem";
import "./RuleList.css";

function RuleList({ rules, ruleStates, selectedRuleId, onRuleClick }) {
  return (
    <ul className="ruleList">
      {rules.map(r => (
        <li key={r.id}>
          <RuleListItem
            rule={r}
            isValid={ruleStates[r.id]}
            isHighlighted={r.id === selectedRuleId}
            onClick={onRuleClick}
          />
        </li>
      ))}
    </ul>
  );
}

export default RuleList;
