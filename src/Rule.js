export const RuleDirection = {
  Horizontal: 0,
  Vertical: 1
};

export class Rule {
  constructor(dir, startIdx, startPos, length, pattern) {
    this.direction = dir;
    this.startIndex = startIdx;
    this.startPosition = startPos;
    this.length = length;
    this.pattern = pattern;
  }

  get id() {
    return (
      (this.direction === RuleDirection.Horizontal ? "H" : "V") +
      this.startIndex
    );
  }

  *positions() {
    let i = this.startPosition[0];
    let j = this.startPosition[1];

    let step;
    if (this.direction === RuleDirection.Horizontal) {
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
    let str = "";
    for (let [i, j] of this.positions()) {
      str += this.charGrid[i][j];
    }

    return str;
  }

  isValid(charGrid) {
    return this.pattern.test(this.getWrittenChars(charGrid));
  }
}
