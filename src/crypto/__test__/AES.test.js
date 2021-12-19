const { getAESSecretKey } = require("../AES");

describe("crypto/AES.js", () => {
  it("should be able to derive key", () => {
    const key = getAESSecretKey("00000000000000000000000000000000", null);
    expect(Buffer.from(key).toString("hex")).toEqual(
      "1340ff4af507d725ddaf217dfc38b95f"
    );
  });
});
