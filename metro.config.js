// https://stackoverflow.com/questions/41813211/how-to-make-react-native-packager-ignore-certain-directories
const blacklist = require('metro-config/src/defaults/blacklist');

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

module.exports = {
  resolver: {
    blacklistRE: blacklist([/*.\/__([A-Z]+)__\/. */]),
  },
};
