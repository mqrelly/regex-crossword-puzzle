import React, { Component } from "react";
import Grid from "./Grid";
import RuleList from "./RuleList";
import { createMap } from "./utils";
import "./Puzzle.css";

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.ruleMap = this.constructRuleMap(this.props.rows, this.props.cols, this.props.rules);

    this.chars = createMap(this.props.rows, this.props.cols);
    this.chars[0][0] = "a";
    this.chars[0][1] = "l";
    this.chars[0][2] = "m";
    this.chars[0][3] = "X";
  }

  render() {
    return (
      <div className="puzzle">
        <Grid
          rows={this.props.rows}
          cols={this.props.cols}
          cellSize={this.props.cellSize}
          ruleMap={this.ruleMap}
          chars={this.chars}
        />
        <RuleList rules={this.props.rules} />
      </div>
    );
  }

  constructRuleMap(rows, cols, rules) {
    const map = createMap(rows, cols, () => []);
    for (let rule of rules) {
      for (let [i, j, n] of rule.positions(rows, cols)) {
        map[i][j].push({ rule, charPos: n });
      }
    }

    return map;
  }
}

export default Puzzle;
