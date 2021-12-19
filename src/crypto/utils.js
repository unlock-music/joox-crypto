/**
 * Merge multiple Uint8Array to one.
 * @param {Uint8Array[]} array uint8 array
 * @returns {Uint8Array}
 */
function mergeUint8Array(array) {
  let length = 0;
  array.forEach((item) => {
    length += item.length;
  });

  let mergedArray = new Uint8Array(length);
  let offset = 0;
  array.forEach((item) => {
    mergedArray.set(item, offset);
    offset += item.length;
  });

  return mergedArray;
}

const WordArray = require("crypto-js/lib-typedarrays");
const C = require("crypto-js/core");

const Uint8ArrayEncoder = {
  /**
   * Converts a word array to a Uint8Array.
   *
   * @param wordArray The word array.
   *
   * @return The Uint8Array.
   *
   * @example
   *
   *     var uint8Array = CryptoJS.enc.Uint8Array.stringify(wordArray);
   */
  stringify: function (wordArray) {
    const words = wordArray.words;
    let bytesToEncode = wordArray.sigBytes;

    // Convert
    const result = new Uint8Array(bytesToEncode);
    let i = 0;
    while (bytesToEncode >= 4) {
      const word = words[i / 4];
      result[i + 0] = (word >>> 24) & 0xff;
      result[i + 1] = (word >>> 16) & 0xff;
      result[i + 2] = (word >>> 8) & 0xff;
      result[i + 3] = (word >>> 0) & 0xff;
      i += 4;
      bytesToEncode -= 4;
    }

    if (bytesToEncode > 0) {
      const word = words[i / 4];
      switch (bytesToEncode) {
        case 3:
          result[i + 2] = (word >>> 8) & 0xff;
        case 2:
          result[i + 1] = (word >>> 16) & 0xff;
        case 1:
          result[i + 0] = (word >>> 24) & 0xff;
      }
    }

    return result;
  },

  /**
   * Converts a Uint8Array to a word array.
   *
   * @param hexStr The Uint8Array.
   *
   * @return The word array.
   *
   * @example
   *
   *     var wordArray = CryptoJS.enc.Uint8Array.parse(uint8Array);
   */
  parse: function (blob) {
    return WordArray.create(blob);
  },

  /**
   * Converts a Uint8Array to a UTF-8 string.
   *
   * @param hexStr The Uint8Array.
   *
   * @return The UTF-8 string.
   *
   * @example
   *
   *     var str = CryptoJS.enc.Uint8Array.toUTF8(uint8Array);
   */
  toUTF8: (uint8Array) => {
    return C.enc.Utf8.stringify(Uint8ArrayEncoder.parse(uint8Array));
  },
};

module.exports = {
  mergeUint8Array,
  Uint8ArrayEncoder,
};
