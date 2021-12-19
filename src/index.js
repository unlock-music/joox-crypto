const DecryptorV4 = require("./crypto/DecryptorV4");

function jooxFactory(fileBody, seed) {
  if (DecryptorV4.detect(fileBody)) {
    return new DecryptorV4(seed);
  }

  throw new Error("input file not supported or invalid");
}

module.exports = jooxFactory;
