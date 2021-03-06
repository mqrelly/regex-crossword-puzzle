import React, { Component } from "react";
import Grid from "./Grid";
import RuleList from "./RuleList";
import { InputAction } from "./PuzzleLogic";
import "./Puzzle.css";

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.store.getState();

    this.handleGridFocus = this.handleGridFocus.bind(this);
    this.handleGridKeyDown = this.handleGridKeyDown.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRuleClick = this.handleRuleClick.bind(this);
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

    const selectedRule = this.state.rules.find(
      r => r.id === this.state.selectedRuleId
    );

    return (
      <div className="puzzle">
        <Grid
          rows={this.state.rows}
          cols={this.state.cols}
          ruleMap={this.state.ruleMap}
          ruleStates={this.state.ruleStates}
          chars={this.state.chars}
          selectedRule={selectedRule}
          focusedCellId={focusedCellId}
          onFocusChanged={this.handleGridFocus}
          onKeyDown={this.handleGridKeyDown}
          onCellClick={this.handleCellClick}
          onElementSet={el => (this.gridElement = el)}
        />
        <RuleList
          rules={this.state.rules}
          ruleStates={this.state.ruleStates}
          selectedRuleId={this.state.selectedRuleId}
          onRuleClick={this.handleRuleClick}
        />
      </div>
    );
  }

  handleGridKeyDown(event) {
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

      case "Enter":
        if (event.ctrlKey) {
          this.props.store.dispatch({ type: InputAction.ChangeDirection });
        } else {
          this.props.store.dispatch({
            type: InputAction.SelectRule,
            forward: !event.shiftKey
          });
        }
        break;

      default:
        if (event.key.length === 1) {
          this.props.store.dispatch({
            type: InputAction.EnterChar,
            char: event.key
          });
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

  handleCellClick(id, row, col) {
    if (this.state.ruleMap[row][col].length > 0) {
      this.props.store.dispatch({ type: InputAction.MoveCaret, row, col });
    }
  }

  handleRuleClick(id) {
    this.props.store.dispatch({
      type: InputAction.SelectRule,
      selectedRuleId: id
    });
    this.gridElement.focus();
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
