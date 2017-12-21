import Directory from './Directory';

class DuplicateScan {
  constructor(path) {
    if (typeof path === 'string') {
      this.setRoot(path);
    }
  }

  /**
   * Set the root directory
   * @param {String} path The path to root directory
   */
  setRoot(path) {
    if (typeof path === 'string') {
      this.root = path;
      this.scan();
    }
  }

  /**
   * Get all files from directory and sub directories
   * @param {Directory} directory Is the object of directories
   */
  scanDir(directory) {
    const directories = directory.getDirectories();
    this.files = this.files.concat(directory.getFiles());
    if (directories.length > 0) {
      for (const dir of directories) {
        this.scanDir(dir);
      }
    }
  }
  /**
   * Scan all files and files in subdirectories
   * @return {Array} The Array with list of duplicated files
   */
  scan() {
    if (this.root) {
      const dir = new Directory(this.root, true);
      this.duplicates = {};
      this.files = [];
      this.scanDir(dir);
      let temp = {};
      // Get all files in directories and subdirectories
      for (const file of this.files) {
        if (Array.isArray(temp[file.getHash()])) {
          temp[file.getHash()].push(file);
        } else {
          temp[file.getHash()] = [];
          temp[file.getHash()].push(file);
        }
      }

      // Search file by file to identify duplicates
      for (const file of Object.keys(temp)) {
        if (Array.isArray(temp[file]) && temp[file].length > 1) {
          this.duplicates[file] = temp[file];
        }
      }

      // Clear memory
      temp = {};
      this.files = [];
    }
  }
  /**
   * Get the duplicate file list
   * @return {Array} The array with all duplicated files finded in search
   */
  getDuplicates() {
    return this.duplicates;
  }
}

/**
 * Find the duplicated files in syncronus mode
 * @param {String} root The path to directory
 * @return {Array} The array with list of duplicated files.
 */
function getDuplicatesSync(root) {
  const dd = new DuplicateScan(root);
  return dd.getDuplicates();
}


/**
 * Find the duplicated files in asyncronus mode
 * @param {String} root The path to directory
 * @return {Array} The array with list of duplicated files.
 */
function getDuplicates(root) {
  return new Promise((resolve, reject) => {
    const dd = new DuplicateScan(root);
    if (dd === null || dd === undefined) {
      reject({
        error: 'Object duplicated is not valid.',
        Object: dd,
        root,
      });
    } else if (dd.getDuplicates().length <= 0) {
      resolve([]);
    } else {
      resolve(dd.getDuplicates());
    }
  });
}

export { getDuplicatesSync, getDuplicates, DuplicateScan };
export default DuplicateScan;
