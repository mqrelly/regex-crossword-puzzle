import { cloneMap, composeReducers } from "./utils";

export const PuzzleAction = {
  Reset: "Reset"
};

export const InputAction = {
  EnterFocus: "EnterFocus",
  LoseFocus: "LoseFocus",
  NextRule: "NextRule",
  PreviousRule: "PreviousRule",
  MoveCaret: "MoveCaret",
  EnterChar: "EnterChar",
  Delete: "Delete",
  BackDelete: "BackDelete"
};

function handlePuzzleAction(state, action) {
  if (typeof state === "undefined") {
    state = {};
  }

  switch (action.type) {
    case PuzzleAction.Reset: {
      let newState = Object.assign({}, action.state, {
        isFocused: state.isFocused
      });

      if (state.isFocused) {
        newState = handleInputAction(newState, InputAction.EnterFocus);
      }

      return newState;
    }

    default:
      return state;
  }
}

function handleInputAction(state, action) {
  switch (action.type) {
    case InputAction.EnterFocus:
      return enterFocus(state);

    case InputAction.LoseFocus:
      return loseFocus(state);

    case InputAction.MoveCaret:
      return moveCaret(state, action);

    case InputAction.Delete:
      return doDelete(state);

    case InputAction.BackDelete:
      return backDelete(state);

    default:
      return state;
  }
}

function enterFocus(state) {
  const selectedRuleId = state.selectedRuleId || state.rules[0].id;

  let caretPos = state.caretPos;
  if (!caretPos) {
    caretPos = state.rules.find(r => r.id === selectedRuleId).startPosition;
  }

  return Object.assign({}, state, {
    isFocused: true,
    selectedRuleId,
    caretPos
  });
}

function loseFocus(state) {
  return Object.assign({}, state, { isFocused: false });
}

function moveCaret(state, { row, col }) {
  if (
    row < 0 ||
    row >= state.rows ||
    col < 0 ||
    col >= state.cols ||
    state.ruleMap[row][col].length === 0
  ) {
    return state;
  }

  return Object.assign({}, state, {
    caretPos: [row, col]
  });
}

function doDelete(state) {
  if (!state.caretPos) {
    return state;
  }

  const chars = cloneMap(state.chars);
  chars[state.caretPos[0]][state.caretPos[1]] = null;

  return Object.assign({}, state, { chars });
}

function backDelete(state) {
  if (!state.caretPos) {
    return state;
  }

  return moveCaret(doDelete(state), {
    row: state.caretPos[0],
    col: state.caretPos[1] - 1
  });
}

export const puzzleReducer = composeReducers(
  handleInputAction,
  handlePuzzleAction
);
