import fs from 'fs';
import path from 'path';

export default class Directory {
  /**
   * Initialize the Directory object and initialize variables
   * @param  {[String]} p The path of directory
   */
  contructor(p) {
    if (typeof p === 'string') {
      this.path = p;
    }
    this.files = this.listFiles();
    this.directories = this.listDir();
  }

  getFiles() {
    return this.files;
  }

  getDirectories() {
    return this.directories;
  }

  getPath() {
    return this.path;
  }

  /**
   * List all content of directory
   * @return {Array|Boolean}  Return the `false` in case of the path is invalid.
   * In case of success return the Array with all file names and dir names
   */
  getFilesAndDirectories() {
    let dir = path.normalize(this.path);
    let res = false;

    if (path.isAbsolute(dir) && fs.lstatSync(dir).isDirectory()) {
      // Add the end bar in string on case of not found
      if (dir.substr(dir.length - 1) !== '/') {
        dir += '/';
      }
      // Retrive the all files and directories in content of directory
      res = fs.readdirSync(dir);
    }
    return res;
  }
}
