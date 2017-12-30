import React, { Component } from "react";
import Puzzle from "./Puzzle";
import { Rule, RULE_DIRECTION } from "./Rule";
import "./App.css";

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
  }

  render() {
    return (
      <div className="App">
        <h1>RegEx Corssword Puzzle</h1>
        <Puzzle
          rows={this.rows}
          cols={this.cols}
          cellSize={80}
          rules={this.rules}
        />
      </div>
    );
  }
}

export default App;
