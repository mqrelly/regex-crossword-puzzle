import { cloneMap, composeReducers } from "./utils";
import { RuleDirection } from "./Rule";

export const PuzzleAction = {
  Reset: "Reset"
};

export const InputAction = {
  EnterFocus: "EnterFocus",
  LoseFocus: "LoseFocus",
  SelectRule: "SelectRule",
  ChangeDirection: "ChangeDirection",
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

    case InputAction.SelectRule:
      return selectRule(state, action);

    case InputAction.ChangeDirection:
      return changeDirection(state);

    case InputAction.MoveCaret:
      return moveCaret(state, action);

    case InputAction.EnterChar:
      return enterChar(state, action);

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

function selectRule(state, { selectedRuleId, forward }) {
  let selectedRule;

  if (typeof forward === "boolean") {
    let idx = state.rules.findIndex(r => r.id === state.selectedRuleId);
    if (forward) {
      idx = idx === state.rules.length - 1 ? 0 : idx + 1;
    } else {
      idx = idx === 0 ? state.rules.length - 1 : idx - 1;
    }
    selectedRule = state.rules[idx];
    selectedRuleId = selectedRule.id;
  } else {
    selectedRule = state.rules.find(r => r.id === selectedRuleId);
    if (!selectedRule) {
      return state;
    }
  }

  let caretPos;
  for (let [i, j] of selectedRule.positions()) {
    caretPos = [i, j];
    if (state.chars[i][j] === null || state.chars[i][j] === undefined) {
      break;
    }
  }

  return Object.assign({}, state, {
    selectedRuleId,
    caretPos
  });
}

function changeDirection(state) {
  if (typeof state.selectedRuleId !== "string") {
    return state;
  }

  const rules = state.ruleMap[state.caretPos[0]][state.caretPos[1]];
  if (rules.length < 2) {
    return state;
  }

  let idx = rules.findIndex(r => r.rule.id === state.selectedRuleId);
  idx = idx === rules.length - 1 ? 0 : idx + 1;

  return Object.assign({}, state, { selectedRuleId: rules[idx].rule.id });
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

  const rules = state.ruleMap[row][col];
  const currentDir = state.rules.find(r => r.id === state.selectedRuleId)
    .direction;
  const selectedRuleId =
    rules.findIndex(r => r.rule.id === state.selectedRuleId) > -1
      ? state.selectedRuleId
      : (rules.find(r => r.rule.direction === currentDir) || rules[0]).rule.id;

  return Object.assign({}, state, {
    caretPos: [row, col],
    selectedRuleId
  });
}

function doDelete(state) {
  if (!state.caretPos) {
    return state;
  }

  const [row, col] = state.caretPos;

  const chars = cloneMap(state.chars);
  chars[row][col] = null;

  const ruleStates = Object.assign({}, state.ruleStates);
  for (let rule of state.ruleMap[row][col].map(r => r.rule)) {
    ruleStates[rule.id] = rule.evaluate(chars);
  }

  return Object.assign({}, state, { chars, ruleStates });
}

function backDelete(state) {
  if (!state.caretPos) {
    return state;
  }

  const dir = state.rules.find(r => r.id === state.selectedRuleId).direction;
  let [row, col] = state.caretPos;
  if (dir === RuleDirection.Horizontal) {
    col -= 1;
  } else {
    row -= 1;
  }

  return moveCaret(doDelete(state), { row, col });
}

function setChar(state, { row, col, char }) {
  if (
    row < 0 ||
    state.rows <= row ||
    col < 0 ||
    state.cols <= col ||
    state.ruleMap[row][col].length === 0
  ) {
    return state;
  }

  const chars = cloneMap(state.chars);
  chars[row][col] = char;

  const ruleStates = Object.assign({}, state.ruleStates);
  for (let rule of state.ruleMap[row][col].map(r => r.rule)) {
    ruleStates[rule.id] = rule.evaluate(chars);
  }

  return Object.assign({}, state, { chars, ruleStates });
}

function enterChar(state, action) {
  if (!state.caretPos) {
    return state;
  }

  const selectedRule = state.rules.find(r => r.id === state.selectedRuleId);
  const [i, j] =
    selectedRule.direction === RuleDirection.Horizontal ? [0, 1] : [1, 0];

  return moveCaret(
    setChar(state, {
      row: state.caretPos[0],
      col: state.caretPos[1],
      char: action.char
    }),
    {
      row: state.caretPos[0] + i,
      col: state.caretPos[1] + j
    }
  );
}

export const puzzleReducer = composeReducers(
  handleInputAction,
  handlePuzzleAction
);
