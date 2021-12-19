const { Uint8ArrayEncoder } = require("./utils");
const { getAESSecretKey, decryptAESBlock } = require("./AES");

const BLOCK_SIZE = 0x100000 /* data size */ + 0x10; /* padding */

class DecryptorV4 {
  /**
   * Derive key from a given seed (user uuid 2)
   * @param {string} encryptionSeed
   */
  constructor(encryptionSeed) {
    this.aesKey = getAESSecretKey(encryptionSeed, null);
  }

  /**
   * Decrypt a given file.
   * @param {Uint8Array} fileBody file body
   */
  decryptFile(fileBody) {
    if (!DecryptorV4.detect(fileBody)) {
      throw new Error("file is not using joox v4");
    }
    const view = new DataView(fileBody.buffer, 4, 8);
    const size = (view.getUint32(0, false) << 32) | view.getUint32(4, false);
    if (size < 0) {
      throw new RangeError("unable to decode size");
    }
    const blocks = [];
    let bytesToDecrypt = fileBody.length;
    let i = /* magic */ 4 + /* orig_size */ 8;
    while (bytesToDecrypt > 0) {
      const blockSize = Math.min(BLOCK_SIZE, bytesToDecrypt);
      const block = fileBody.subarray(i, i + blockSize);
      const blockDecrypted = decryptAESBlock(this.aesKey, block);
      blocks.push(blockDecrypted);

      i += blockSize;
      bytesToDecrypt -= blockSize;
    }
    return blocks;
  }
}

/**
 * Detect if encryption is supported.
 * @param {Uint8Array} fileBody File body for detection
 */
DecryptorV4.detect = (fileBody) => {
  const magic = Uint8ArrayEncoder.toUTF8(fileBody.slice(0, 4));
  return magic === "E!04";
};

module.exports = DecryptorV4;
