const newType = () => {
  let typ;
  typ = function (high, low) {
    this.high = (high + Math.floor(Math.ceil(low) / 4294967296)) >>> 0;
    this.low = low >>> 0;
    this.val = this;
  };
  typ.keyFor = function (x) {
    return x.high + x.low;
  };

  let zero = new typ(0, 0);
  typ.zero = function () {
    return zero;
  };

  return typ;
};

let Uint64 = newType();

const flatten64 = (x) => {
  return x.high * 4294967296 + x.low;
};

const shiftLeft64 = (x, y) => {
  if (y === 0) {
    return x;
  }
  if (y < 32) {
    return new x.constructor(
      (x.high << y) | (x.low >>> (32 - y)),
      (x.low << y) >>> 0
    );
  }
  if (y < 64) {
    return new x.constructor(x.low << (y - 32), 0);
  }
  return new x.constructor(0, 0);
};

const shiftRightUint64 = (x, y) => {
  if (y === 0) {
    return x;
  }
  if (y < 32) {
    return new x.constructor(
      x.high >>> y,
      ((x.low >>> y) | (x.high << (32 - y))) >>> 0
    );
  }
  if (y < 64) {
    return new x.constructor(0, x.high >>> (y - 32));
  }
  return new x.constructor(0, 0);
};

const leadingZeros64 = (x) => {
  return (64 - Len64(x)) >> 0;
};

const Len64 = (x) => {
  let n;
  n = 0;
  if (x.high > 1 || (x.high === 1 && x.low >= 0)) {
    x = shiftRightUint64(x, 32);
    n = 32;
  }
  if (x.high > 0 || (x.high === 0 && x.low >= 65536)) {
    x = shiftRightUint64(x, 16);
    n = (n + 16) >> 0;
  }
  if (x.high > 0 || (x.high === 0 && x.low >= 256)) {
    x = shiftRightUint64(x, 8);
    n = (n + 8) >> 0;
  }
  n =
    (n +
      ("\x00\x01\x02\x02\x03\x03\x03\x03\x04\x04\x04\x04\x04\x04\x04\x04\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x05\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x06\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b".charCodeAt(
        flatten64(x)
      ) >>
        0)) >>
    0;
  return n;
};

const paddedLen = (len) => {
  let e, mask, s, x, x1, x2, x3, z;
  if (len <= 0) {
    return 0;
  }
  e = (63 - leadingZeros64(new Uint64(0, len))) >> 0;
  s = (64 - leadingZeros64(new Uint64(0, e))) >> 0;
  z = (e - s) >> 0;
  mask =
    ((x = shiftLeft64(new Uint64(0, 1), z)), new Uint64(x.high - 0, x.low - 1));
  return (
    ((x1 =
      ((x2 = new Uint64(0, len)),
      new Uint64(x2.high + mask.high, x2.low + mask.low))),
    (x3 = new Uint64(~mask.high, ~mask.low >>> 0)),
    new Uint64(x1.high & x3.high, (x1.low & x3.low) >>> 0)).low >> 0
  );
};

function paddingLength(len) {
  return (paddedLen(len) - len) >> 0;
}

module.exports = paddingLength;