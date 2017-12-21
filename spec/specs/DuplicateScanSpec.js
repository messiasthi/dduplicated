import fs from 'fs';
import path from 'path';
import { DuplicateScan, getDuplicates, getDuplicatesSync } from '../../src/modules/DuplicateScan';
/**
 * Create the session of tests
 * @param  {String} Session Test session name
 * @param  {function} Cases Cases to of test
 * @return {void}
 */
describe('DuplicateScan', () => {
  // Prepare the files to test
  beforeEach(() => {
    const dirs = ['/', '/dir1/', '/dir2/', '/dir3/', '/dir4/'];
    const files = ['test1.txt', 'test2.txt', 'test3.txt', 'test4.txt'];
    const original = `${process.env.PWD}/spec/dirTest/`;
    const scan = `${process.env.PWD}/spec/scanTest`;
    if (!fs.existsSync(scan)) {
      fs.mkdirSync(scan);
    }

    for (const dir of dirs) {
      if (dir !== '/') {
        if (!fs.existsSync(`${scan}${dir}`)) {
          fs.mkdirSync(`${scan}${dir}`);
        }
      }
      for (const file of files) {
        if (!fs.existsSync(`${scan}${dir}${file}`)) {
          fs.copyFileSync(`${original}${dir}${file}`, `${scan}${dir}${file}`);
        }
      }
    }
  });

  it('Should be equals to list of duplicated files', () => {
    const dd = new DuplicateScan(`${process.env.PWD}/spec/scanTest/dir1`);
    const expected = [
      `${process.env.PWD}/spec/scanTest/dir1/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test4.txt`];
    const paths = [];
    const result = dd.getDuplicates();
    for (const file in result) {
      if (result.hasOwnProperty(file)) {
        for (const f in result[file]) {
          paths.push(result[file][f].path);
        }
      }
    }
    expect(paths).toEqual(expected);
  });

  it('Should be equals to list of duplicated files', () => {
    const dd = new DuplicateScan(`${process.env.PWD}/spec/scanTest/dir2`);
    const expected = [
      `${process.env.PWD}/spec/scanTest/dir2/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test4.txt`];

    const paths = [];
    const result = dd.getDuplicates();
    for (const file in result) {
      if (result.hasOwnProperty(file)) {
        for (const f in result[file]) {
          paths.push(result[file][f].path);
        }
      }
    }
    expect(paths).toEqual(expected);
  });

  it('Should be equals to list of duplicated files', () => {
    const expected = [
      `${process.env.PWD}/spec/scanTest/dir3/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test4.txt`];

    const paths = [];
    const result = getDuplicatesSync(`${process.env.PWD}/spec/scanTest/dir3`);
    for (const file in result) {
      if (result.hasOwnProperty(file)) {
        for (const f in result[file]) {
          paths.push(result[file][f].path);
        }
      }
    }
    expect(paths).toEqual(expected);
  });

  it('Should be equals to list of duplicated files', () => {
    const dd = new DuplicateScan(`${process.env.PWD}/spec/scanTest/dir4`);
    const expected = [
      `${process.env.PWD}/spec/scanTest/dir4/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test4.txt`];

    const paths = [];
    getDuplicates(`${process.env.PWD}/spec/scanTest/dir4`)
    .then((result) => {
      for (const file in result) {
        if (result.hasOwnProperty(file)) {
          for (const f in result[file]) {
            paths.push(result[file][f].path);
          }
        }
      }
      expect(paths).toEqual(expected);
    }).catch((error) => {
      expect(error).not.toEqual(expected);
    });
  });

  it('Should be equals to list of duplicated files', () => {
    const dd = new DuplicateScan(`${process.env.PWD}/spec/scanTest`);
    const expected = [
      `${process.env.PWD}/spec/scanTest/test1.txt`,
      `${process.env.PWD}/spec/scanTest/test2.txt`,
      `${process.env.PWD}/spec/scanTest/test3.txt`,
      `${process.env.PWD}/spec/scanTest/test4.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir1/test4.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir2/test4.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir3/test4.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test1.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test2.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test3.txt`,
      `${process.env.PWD}/spec/scanTest/dir4/test4.txt`];

    const paths = [];
    const result = getDuplicatesSync(`${process.env.PWD}/spec/scanTest`);
    for (const file in result) {
      if (result.hasOwnProperty(file)) {
        for (const f in result[file]) {
          paths.push(result[file][f].path);
        }
      }
    }
    expect(paths).toEqual(expected);
  });
});
