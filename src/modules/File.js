import path from 'path';
import fs from 'fs';
import { getHash } from '../../src/helpers/MD5';

export default class File {
  /**
   * Initialize the File object
   * @param  {[String]} p File path
   */
  constructor(p) {
    if (typeof p === 'string' && fs.existsSync(path.normalize(p))) {
      // Remove double bars and other possible errors in path
      this.path = fs.realpathSync(path.normalize(p));
    } else {
      this.path = '.';
    }

    // Check if is absolute path, case not, convert relative to absolute
    if (!path.isAbsolute(this.path)) {
      this.path = path.join(process.env.PWD, this.path);
    }
    if (!this.path) {
      console.error('The path is invalid', this.path);
    }

    // Check if is file
    if (fs.lstatSync(this.path).isFile()) {
      this.hash = getHash(this.path);
      this.name = path.basename(this.path);
    }
  }

  /**
   * Get path of file
   * @return {String} Path of file
   */
  getPath() {
    return this.path;
  }

  /**
   * Get hash of file
   * @return {String} Hash of file
   */
  getHash() {
    return this.hash;
  }

  /**
   * Get name of file
   * @return {String} Name of file
   */
  getName() {
    return this.name;
  }
}
