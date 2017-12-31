import React, { Component } from "react";
import Grid from "./Grid";
import RuleList from "./RuleList";
import { InputAction } from "./PuzzleLogic";
import { createMap } from "./utils";
import "./Puzzle.css";

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.store.getState();
    this.state.ruleMap = this.constructRuleMap(
      this.state.rows,
      this.state.cols,
      this.state.rules
    );

    this.handleGridFocus = this.handleGridFocus.bind(this);
    this.handleGridKeyDown = this.handleGridKeyDown.bind(this);
  }

  componentWillMount() {
    this.unsubscribeFromStore = this.props.store.subscribe(() =>
      this.setState(this.props.store.getState())
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
  }

  render() {
    const focusedCellId = this.state.isFocused
      ? this.state.caretPos[0] * this.state.cols + this.state.caretPos[1]
      : null;

    return (
      <div className="puzzle">
        <Grid
          rows={this.state.rows}
          cols={this.state.cols}
          cellSize={this.props.cellSize}
          ruleMap={this.state.ruleMap}
          chars={this.state.chars}
          focusedCellId={focusedCellId}
          onFocusChanged={this.handleGridFocus}
          onKeyDown={this.handleGridKeyDown}
        />
        <RuleList rules={this.state.rules} />
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

  handleGridKeyDown(event) {
    console.log(`key: ${event.key}, keyCode: ${event.keyCode}`);

    switch (event.key) {
      case "ArrowUp":
        this.props.store.dispatch(this.moveCaret(-1, 0));
        event.preventDefault();
        break;

      case "ArrowDown":
        this.props.store.dispatch(this.moveCaret(1, 0));
        event.preventDefault();
        break;

      case "ArrowLeft":
        this.props.store.dispatch(this.moveCaret(0, -1));
        event.preventDefault();
        break;

      case "ArrowRight":
        this.props.store.dispatch(this.moveCaret(0, 1));
        event.preventDefault();
        break;

      case "Delete":
        this.props.store.dispatch({ type: InputAction.Delete });
        event.preventDefault();
        break;

      case "Backspace":
        this.props.store.dispatch({ type: InputAction.BackDelete });
        event.preventDefault();
        break;

      case "Tab":
        // Just ignore this key. Let it switch focus to other elements.
        break;

      default:
        if (event.key.length === 1) {
          this.props.store.dispatch({ type: InputAction.EnterChar, char: event.key });
          event.preventDefault();
        }
    }
  }

  handleGridFocus(event) {
    const actionType = event.gained
      ? InputAction.EnterFocus
      : InputAction.LoseFocus;
    this.props.store.dispatch({ type: actionType });
  }

  moveCaret(i, j) {
    return {
      type: InputAction.MoveCaret,
      row: this.state.caretPos[0] + i,
      col: this.state.caretPos[1] + j
    };
  }
}

export default Puzzle;
