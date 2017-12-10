'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directory = function () {
  function Directory() {
    _classCallCheck(this, Directory);
  }

  _createClass(Directory, [{
    key: 'contructor',

    /**
     * Initialize the Directory object and initialize variables
     * @param  {String} p The path of directory
     */
    value: function contructor(p) {
      this.files = [];
      this.directories = [];
      if (typeof p !== 'string') {
        this.path = '';
      }
      // Remove double bars and other possible errors in path
      this.path = _path2.default.normalize(p);
      // Check if is absolute path, case not, convert relative to absolute
      if (!_path2.default.isAbsolute(this.path)) {
        this.path = _path2.default.join(process.env.PWD, this.path);
      }
      // Check if is directory
      if (_fs2.default.lstatSync(this.path).isDirectory()) {
        // Remove the end bar of path in case exists
        if (this.path.substr(this.path.length - 1) === '/' || this.path.substr(this.path.length - 1) === '\\') {
          this.path = this.path.substr(0, this.path.length - 1);
        }
        // Retrive the all files and directories in content of directory
        var res = [];
        res = _fs2.default.readdirSync(this.path);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (_fs2.default.lstatSync(item).isDirectory()) {
              this.addDirectory(item);
            } else {
              this.addFile(item);
            }
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
     * List all files in directory
     * @return {Array} List of files in directory
     */

  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.files;
    }

    /**
     * Add new file to list
     * @param {String} p The path new file
     * @return {Boolean} Return false in case of can't add new file to list
     */

  }, {
    key: 'addFile',
    value: function addFile(p) {
      if (typeof p !== 'string') {
        console.error("Can't add the new file. The `p` is not a string");
        return false;
      }
      var bar = '/';
      if (/^win/.test(process.platform)) {
        bar = '\\';
      }
      var pth = _path2.default.normalize('' + this.path + bar + p);

      if (_fs2.default.lstatSync(pth).isFile()) {
        this.files.push(pth.substr(this.path.length + 1));
      }
      return true;
    }

    /**
     * List all directories in directory
     * @return {Array} List of directories in directory
     */

  }, {
    key: 'getDirectories',
    value: function getDirectories() {
      return this.directories;
    }

    /**
     * Add new directory to list
     * @param {String} p The path new directory
     * @return {Boolean} Return false in case of can't add new directory to list
     */

  }, {
    key: 'addDirectory',
    value: function addDirectory(p) {
      if (typeof p !== 'string') {
        console.error("Can't add the new directory. The `p` is not a string");
        return false;
      }
      var bar = '/';
      if (/^win/.test(process.platform)) {
        bar = '\\';
      }
      var pth = _path2.default.normalize('' + this.path + bar + p);
      // Check if is real path and if is directory
      if (_fs2.default.lstatSync(pth).isDirectory()) {
        this.directories.push(pth.substr(this.path.length + 1));
      }
      return true;
    }

    /**
     * Get the string of path in this directory
     * @return {String} The path
     */

  }, {
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }

    /**
     * List all content of directory
     * @return {Array}  Return the Array with all file names and dir names
     */

  }, {
    key: 'getFilesAndDirectories',
    value: function getFilesAndDirectories() {
      return this.directories.concat(this.files);
    }
  }]);

  return Directory;
}();

exports.default = Directory;