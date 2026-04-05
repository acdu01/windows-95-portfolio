'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./rainbow-sprinkles-createRuntimeFn.cjs.prod.js");
} else {
  module.exports = require("./rainbow-sprinkles-createRuntimeFn.cjs.dev.js");
}
