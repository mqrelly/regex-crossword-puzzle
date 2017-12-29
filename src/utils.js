export function createMap(rows, cols, fill=null) {
  return new Array(rows)
    .fill(null)
    .map((_, i) => new Array(cols)
        .fill(null)
        .map((_, j) => typeof(fill) === "function"
                    ? fill(i, j) : fill));
}
