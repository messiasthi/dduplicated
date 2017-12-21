'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Directory = function () {
  /**
   * Initialize the Directory object and initialize variables
   * @param  {String} p The path of directory
   */
  function Directory(p, recursive) {
    _classCallCheck(this, Directory);

    this.recursive = recursive === true;
    this.files = [];
    this.directories = [];
    this.fileList = [];
    this.directoryList = [];

    if (typeof p === 'string' && _fs2.default.existsSync(_path2.default.normalize(p))) {
      // Remove double bars and other possible errors in path
      this.path = _fs2.default.realpathSync(_path2.default.normalize(p));
    } else {
      this.path = '.';
    }

    // Check if is absolute path, case not, convert relative to absolute
    if (!_path2.default.isAbsolute(this.path)) {
      this.path = _path2.default.join(process.env.PWD, this.path);
    }
    if (!this.path) {
      console.error('The path is invalid', this.path);
    }

    // Check if is directory
    if (_fs2.default.lstatSync(this.path).isDirectory()) {
      // Remove the end bar of path in case exists
      var endBarUnix = this.path.substr(this.path.length - 1) === '/' && this.path.length > 1;
      var endBarWin = this.path.substr(this.path.length - 1) === '\\' && this.path.length > 1;
      if (endBarWin || endBarUnix) {
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

          var pth = _path2.default.normalize(this.path + '/' + item);
          if (_fs2.default.existsSync(pth)) {
            if (_fs2.default.lstatSync(pth).isDirectory()) {
              this.addDirectory(item);
            } else {
              this.addFile(item);
            }
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


  _createClass(Directory, [{
    key: 'getFilesPath',
    value: function getFilesPath() {
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
      // Check if this code run in windows
      if (/^win/.test(process.platform)) {
        bar = '\\';
      }
      var pth = _path2.default.normalize('' + this.getPath() + bar + p);

      if (_fs2.default.existsSync(pth) && _fs2.default.lstatSync(pth).isFile()) {
        this.files.push(pth.substr(this.path.length + 1));
        this.fileList.push(new _File2.default(pth));
      }
      return true;
    }

    /**
     * List all directories in directory
     * @return {Array} List of directories in directory
     */

  }, {
    key: 'getDirectoriesPath',
    value: function getDirectoriesPath() {
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
      var pth = _fs2.default.realpathSync(_path2.default.normalize('' + this.getPath() + bar + p));
      // Check if is real path and if is directory
      if (_fs2.default.existsSync(pth) && _fs2.default.lstatSync(pth).isDirectory()) {
        this.directories.push(pth.substr(this.path.length + 1));
        if (this.recursive) {
          this.directoryList.push(new Directory(pth, true));
        }
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

    /**
     * List all file objects in directory
     * @return {Array} Return the array with all file objects
     */

  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.fileList;
    }

    /**
     * List all directory objects in directory
     * @return {Array} Return the array with all directory objects
     */

  }, {
    key: 'getDirectories',
    value: function getDirectories() {
      return this.directoryList;
    }
  }]);

  return Directory;
}();

exports.default = Directory;