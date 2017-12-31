import React, { Component } from "react";
import Puzzle from "./Puzzle";
import { Rule, RULE_DIRECTION } from "./Rule";
import { createStore } from "redux";
import { puzzleReducer, PuzzleAction } from "./PuzzleLogic";
import { createMap } from "./utils";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const rules = [
      new Rule(RULE_DIRECTION.Horizontal, 1, [0, 0], 4, /alma/),
      new Rule(RULE_DIRECTION.Horizontal, 5, [1, 0], 2, /A\d/),
      new Rule(RULE_DIRECTION.Horizontal, 9, [2, 0], 4, /asdf/),
      new Rule(RULE_DIRECTION.Vertical, 1, [0, 0], 3, /a{3}/i),
      new Rule(RULE_DIRECTION.Vertical, 2, [0, 1], 3, /^[^\s]*$/),
      new Rule(RULE_DIRECTION.Vertical, 4, [0, 3], 3, /aSf/)
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
