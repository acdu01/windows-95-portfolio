'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./rainbow-sprinkles.cjs.prod.js");
} else {
  module.exports = require("./rainbow-sprinkles.cjs.dev.js");
}
