const DecryptorV4 = require("../crypto/DecryptorV4");
const jooxFactory = require("../index");

describe("package entry", () => {
  it("should return null on unsupported file", () => {
    const input = Buffer.from("E!99........", "utf-8");
    const decryptor = jooxFactory(input, "".padStart(32, "0"));
    expect(decryptor).toBeNull();
  });

  it("should return an encryptor on v4 magic file", () => {
    const input = Buffer.from("E!04........", "utf-8");
    const decryptor = jooxFactory(input, "".padStart(32, "0"));
    expect(decryptor).toBeInstanceOf(DecryptorV4);
  });
});
