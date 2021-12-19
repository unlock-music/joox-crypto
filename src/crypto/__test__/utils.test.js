const WordArray = require("crypto-js/lib-typedarrays");
const { Uint8ArrayEncoder } = require("../utils");

describe("utils/Uint8Encoder", () => {
  describe("#parse", () => {
    it("should be able to parse bytes correctly (aligned 4 bytes)", () => {
      const result = Uint8ArrayEncoder.parse(new Uint8Array([1, 2, 3, 4]));
      expect(result.words).toEqual([0x01020304]);
    });
    it("should be able to parse bytes correctly (unaligned)", () => {
      const result = Uint8ArrayEncoder.parse(
        new Uint8Array([1, 2, 3, 4, 0xff, 0x7f])
      );
      expect(result.words).toEqual([0x01020304, 0xff7f0000 | 0]);
    });
  });

  describe("#stringify", () => {
    it("should be able to decode to Uint8Array (aligned)", () => {
      const result = Uint8ArrayEncoder.stringify(
        WordArray.create([0x11223344, 0x55667788])
      );
      expect(result).toEqual(
        new Uint8Array([0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88])
      );
    });
  });
});
