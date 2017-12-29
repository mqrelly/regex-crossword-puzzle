import { createMap } from "./utils";
import React, { Component } from "react";
import "./App.css";
import Grid from "./Grid";
import { Rule, RULE_DIRECTION } from "./Rule";
import RuleList from "./RuleList";

class App extends Component {
  constructor(props) {
    super(props);

    this.rules = [
      new Rule(RULE_DIRECTION.Horizontal, 1, 4, /alma/),
      new Rule(RULE_DIRECTION.Horizontal, 5, 2, /A\d/),
      new Rule(RULE_DIRECTION.Horizontal, 9, 4, /asdf/),
      new Rule(RULE_DIRECTION.Vertical, 1, 3, /a{3}/i),
      new Rule(RULE_DIRECTION.Vertical, 2, 3, /^[^\s]*$/),
      new Rule(RULE_DIRECTION.Vertical, 4, 3, /aSf/)
    ];

    this.rows = 3;
    this.cols = 4;

    this.ruleMap = constructRuleMap(this.rows, this.cols, this.rules);

    this.chars = createMap(this.rows, this.cols);
    this.chars[0][0] = "a";
    this.chars[0][1] = "l";
    this.chars[0][2] = "m";
    this.chars[0][3] = "X";

    function constructRuleMap(rows, cols, rules) {
      const map = createMap(rows, cols, () => []);
      for (let rule of rules) {
        for (let [i, j, n] of rule.positions(rows, cols)) {
          map[i][j].push({ rule, charPos: n });
        }
      }

      return map;
    }
  }

  render() {
    return (
      <div className="App">
        <Grid
          rows={this.rows}
          cols={this.cols}
          cellSize={80}
          ruleMap={this.ruleMap}
          chars={this.chars}
        />
        <RuleList rules={this.rules} />
      </div>
    );
  }
}

export default App;
