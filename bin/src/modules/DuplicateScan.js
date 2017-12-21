'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDuplicated = exports.getDuplicatedSync = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Directory = require('./Directory');

var _Directory2 = _interopRequireDefault(_Directory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DuplicateScan = function () {
  function DuplicateScan(path) {
    _classCallCheck(this, DuplicateScan);

    if (typeof path === 'string') {
      this.setRoot(path);
    }
  }

  /**
   * Set the root directory
   * @param {String} path The path to root directory
   */


  _createClass(DuplicateScan, [{
    key: 'setRoot',
    value: function setRoot(path) {
      if (typeof path === 'string') {
        this.root = path;
        this.scan();
      }
    }

    /**
     * Get all files from directory and sub directories
     * @param {Directory} directory Is the object of directories
     */

  }, {
    key: 'scanDir',
    value: function scanDir(directory) {
      var directories = directory.getDirectories();
      this.files.concat(directory.getFiles());
      if (directories.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = directories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var dir = _step.value;

            this.scanDir(dir);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
    /**
     * Scan all files and files in subdirectories
     * @return {Array} The Array with list of duplicated files
     */

  }, {
    key: 'scan',
    value: function scan() {
      if (this.root) {
        var dir = new _Directory2.default(this.root, true);
        this.duplicates = {};
        this.files = [];
        this.scanDir(dir);
        var temp = {};
        // Get all files in directories and subdirectories
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var file = _step2.value;

            if (Array.isArray(temp[file.getHash()])) {
              temp[file.getHash()].push(file);
            } else {
              temp[file.getHash()] = [];
              temp[file.getHash()].push(file);
            }
          }
          // Search file by file to identify duplicates
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(temp)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _file = _step3.value;

            if (Array.isArray(temp[_file]) && temp[_file].length > 1) {
              this.duplicates[_file] = temp[_file];
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
    /**
     * Get the duplicate file list
     * @return {Array} The array with all duplicated files finded in search
     */

  }, {
    key: 'getDuplicated',
    value: function getDuplicated() {
      return this.duplicates;
    }
  }]);

  return DuplicateScan;
}();

/**
 * Find the duplicated files in syncronus mode
 * @param {String} root The path to directory
 * @return {Array} The array with list of duplicated files.
 */


exports.default = DuplicateScan;
function getDuplicatedSync(root) {
  var dd = new DuplicateScan(root);
  return dd.getDuplicated();
}

/**
 * Find the duplicated files in asyncronus mode
 * @param {String} root The path to directory
 * @return {Array} The array with list of duplicated files.
 */
function getDuplicated(root) {
  return new Promise(function (resolve, reject) {
    var dd = new DuplicateScan(root);
    if (dd === null || dd === undefined) {
      reject({
        error: 'Object duplicated is not valid.',
        Object: dd,
        root: root
      });
    } else if (dd.getDuplicated().length <= 0) {
      console.info('We do not find duplicated files.');
      resolve([]);
    } else {
      resolve(dd.getDuplicated());
    }
  });
}

exports.getDuplicatedSync = getDuplicatedSync;
exports.getDuplicated = getDuplicated;