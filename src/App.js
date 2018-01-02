import React, { Component } from "react";
import Puzzle from "./Puzzle";
import { Rule, RuleDirection } from "./Rule";
import { createStore } from "redux";
import { puzzleReducer, PuzzleAction } from "./PuzzleLogic";
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

    this.store = createStore(puzzleReducer);
    this.store.dispatch({
      type: PuzzleAction.Reset,
      state: {
        rules
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
