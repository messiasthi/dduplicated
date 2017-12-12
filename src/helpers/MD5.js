import md5File from 'md5-file';
import fs from 'fs';
import path from 'path';

/**
 * Get the MD5 hash of file.
 * @param  {String} p The file path
 * @return {String}   The string contain the file hash or false in error case
 */
function getHash(p) {
  // Get path to file, in case of symbolic link, get the real path to file
  const filePath = fs.realpathSync(path.normalize(p));
  let hash = false;
  // Check if is file
  if (fs.lstatSync(filePath).isFile()) {
    hash = md5File.sync(filePath);
  }
  return hash;
}
export { getHash };
