'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _MD = require('../../src/helpers/MD5');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = function () {
  /**
   * Initialize the File object
   * @param  {[String]} p File path
   */
  function File(p) {
    _classCallCheck(this, File);

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

    // Check if is file
    if (_fs2.default.lstatSync(this.path).isFile()) {
      this.hash = (0, _MD.getHash)(this.path);
      this.name = _path2.default.basename(this.path);
    }
  }

  /**
   * Get path of file
   * @return {String} Path of file
   */


  _createClass(File, [{
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }

    /**
     * Get hash of file
     * @return {String} Hash of file
     */

  }, {
    key: 'getHash',
    value: function getHash() {
      return this.hash;
    }

    /**
     * Get name of file
     * @return {String} Name of file
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);

  return File;
}();

exports.default = File;