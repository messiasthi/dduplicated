'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHash = undefined;

var _md5File = require('md5-file');

var _md5File2 = _interopRequireDefault(_md5File);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the MD5 hash of file.
 * @param  {String} p The file path
 * @return {String}   The string contain the file hash or false in error case
 */
function getHash(p) {
  // Get path to file, in case of symbolic link, get the real path to file
  var filePath = _fs2.default.realpathSync(_path2.default.normalize(p));
  var hash = false;
  // Check if is file
  if (_fs2.default.lstatSync(filePath).isFile()) {
    hash = _md5File2.default.sync(filePath);
  }
  return hash;
}
exports.getHash = getHash;