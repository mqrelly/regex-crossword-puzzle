export const RULE_DIRECTION = {
  Horizontal: 0,
  Vertical: 1
};

export class Rule {
  constructor(dir, startIdx, length, pattern) {
    this.direction = dir;
    this.startIndex = startIdx;
    this.length = length;
    this.pattern = pattern;
  }

  get id() {
    return (this.direction === RULE_DIRECTION.Horizontal ? "H" : "V") + this.startIndex;
  }

  *positions (rows, cols) {
    let i = Math.trunc((this.startIndex - 1) / cols);
    let j = (this.startIndex - 1) % cols;

    let step;
    if (this.direction === RULE_DIRECTION.Horizontal) {
      step = [0, 1];
    } else {
      step = [1, 0];
    }

    for (let k = 0; k < this.length; k += 1) {
      yield [i, j, k];

      i += step[0];
      j += step[1];
    }
  }

  getWrittenChars(charGrid) {
    const rows = charGrid.length;
    const cols = charGrid[0].length;

    let str = "";
    for (let [i, j] of this.positions(rows, cols)) {
      str += this.charGrid[i][j];
    }

    return str;
  }

  isValid(charGrid) {
    return this.pattern.test(this.getWrittenChars(charGrid));
  }
}

