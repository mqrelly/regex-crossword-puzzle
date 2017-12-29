import React, { Component } from 'react';
import './App.css';
import Grid from "./Grid";
import { Rule, RULE_DIRECTION } from "./Rule";
import RuleList from "./RuleList";

class App extends Component {
  render() {
    const rules = [
        new Rule(RULE_DIRECTION.Horizontal, 1, 4, /alma/),
        new Rule(RULE_DIRECTION.Horizontal, 5, 2, /A\d/),
        new Rule(RULE_DIRECTION.Horizontal, 9, 4, /asdf/),
        new Rule(RULE_DIRECTION.Vertical, 1, 3, /a{3}/i),
        new Rule(RULE_DIRECTION.Vertical, 2, 3, /^[^\s]*$/),
        new Rule(RULE_DIRECTION.Vertical, 4, 3, /aSf/),
    ];

    return (
      <div className="App">
        <Grid rows={3} cols={4} chars={new Array(3).fill(new Array(4).fill(null))} />
        <RuleList rules={rules} />
      </div>
    );
  }
}

export default App;
