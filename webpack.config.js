const path = require("path");

module.exports = {
  entry: {
    index: [
      "./script/pages/index.js",
      "./script/templates/media.js",
      "./script/templates/photographer.js",
    ],
    photographer: [
      "./script/pages/photographer.js",
      "./script/templates/media.js",
      "./script/templates/photographer.js",
    ],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
