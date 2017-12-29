import React from "react";
import { RULE_DIRECTION } from "./Rule.js";
import "./RuleList.css";

function RuleItem({rule}) {
  const key = `${rule.startIndex}${(rule.direction === RULE_DIRECTION.Horizontal ? "⇨" : "⇩")}`; 

  return (
    <React.Fragment>
      <span className="key">{key}</span>
      <span className="pattern">{rule.pattern.toSource()}</span>
    </React.Fragment>
  );
}

function RuleList({rules}) {
  return (
    <ul className="ruleList">
      { rules.map(r => (<li key={r.id}><RuleItem rule={r} /></li>)) }
    </ul>
  );
}

export default RuleList;
