const DecryptorV4 = require("./crypto/DecryptorV4");

function jooxFactory(fileBody, seed) {
  if (DecryptorV4.detect(fileBody)) {
    return new DecryptorV4(seed);
  }

  return null;
}

module.exports = jooxFactory;
