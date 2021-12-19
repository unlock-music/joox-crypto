const DecryptorV4 = require("../DecryptorV4");
const fs = require("fs");
const { Uint8ArrayEncoder, mergeUint8Array } = require("../utils");
const { toUTF8 } = Uint8ArrayEncoder;

describe("crypto/DecryptorV4", () => {
  it("should be able to decode v4 file", () => {
    const data = fs.readFileSync(__dirname + "/fixture/v4_hello.bin");
    const decryptor = new DecryptorV4("00000000000000000000000000000000");
    const result = decryptor.decryptFile(data);
    expect(toUTF8(mergeUint8Array(result))).toEqual("Hello World");
  });
});
