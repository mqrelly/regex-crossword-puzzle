export function createMap(rows, cols, fill = null) {
  return new Array(rows)
    .fill(null)
    .map((_, i) =>
      new Array(cols)
        .fill(null)
        .map((_, j) => (typeof fill === "function" ? fill(i, j) : fill))
    );
}

export function cloneMap(map) {
  const rows = map.length;
  const cols = map[0].length;
  const clone = createMap(rows, cols);
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < cols; j += 1) {
      clone[i][j] = map[i][j];
    }
  }

  return clone;
}

export function composeReducers(...reducers) {
  return (state, action) =>
    reducers.reverse().reduce((s, r) => r(s, action), state);
}

export function last(iterator) {
  let lastVal;
  let it = iterator.next();
  while (!it.done) {
    lastVal = it.value;
    it = iterator.next();
  }

  return lastVal;
}
