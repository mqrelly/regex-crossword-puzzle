import React, { Component } from "react";
import Puzzle from "./Puzzle";
import { Rule, RuleDirection } from "./Rule";
import { createStore } from "redux";
import { puzzleReducer, PuzzleAction } from "./PuzzleLogic";
import { createMap } from "./utils";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const rules = [
      new Rule(RuleDirection.Horizontal, 1, [0, 0], 4, /alma/),
      new Rule(RuleDirection.Horizontal, 5, [1, 0], 2, /A\d/),
      new Rule(RuleDirection.Horizontal, 9, [2, 0], 4, /asdf/),
      new Rule(RuleDirection.Vertical, 1, [0, 0], 3, /a{3}/i),
      new Rule(RuleDirection.Vertical, 2, [0, 1], 3, /^[^\s]*$/),
      new Rule(RuleDirection.Vertical, 4, [0, 3], 3, /aSf/)
    ];

    const chars = createMap(3, 4);
    chars[0][0] = "a";
    chars[0][1] = "l";
    chars[0][2] = "m";
    chars[0][3] = "X";

    this.store = createStore(puzzleReducer);
    this.store.dispatch({
      type: PuzzleAction.Reset,
      state: {
        rows: 3,
        cols: 4,
        rules,
        chars
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>RegEx Corssword Puzzle</h1>
        <Puzzle cellSize={80} store={this.store} />
      </div>
    );
  }
}

export default App;
