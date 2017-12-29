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

  getWrittenChars(charGrid) {
    const rows = charGrid.length;
    const cols = charGrid[0].length;

    let i = Math.trunc(this.startIndex / cols);
    let j = this.startIndex % rows;

    let step;
    if (this.direction === RULE_DIRECTION.Horizontal) {
      step = [1, 0];
    } else {
      step = [0, 1];
    }

    let str = "";
    for (let k = 0; k < this.length; k += 1) {
      str += this.charGrid[i][j];
      [i, j] = [i + step[0], j + step[1]];
    }

    return str;
  }

  isValid(charGrid) {
    return this.pattern.test(this.getWrittenChars(charGrid));
  }
}

