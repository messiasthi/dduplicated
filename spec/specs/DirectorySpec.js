import install from 'jasmine-es6';
import Directory from '../src/modules/Directory';

// Prepare the jasmine
install();

/**
 * Create the session of tests
 * @param  {String} FindLister Test session name
 * @param  {function}            Cases of test
 * @return {void}
 */

describe('Directory', () => {
  it('Should be equals to list all directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest`);
    const list = dir.getDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4',
      'emptyDirectory'];
    expect(list).toEqual(expected);
  });

  it('Should be equals empty list of directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getDirectories();
    const expected = [];
    expect(list).toEqual(expected);
  });

  it('Should be not equals to list of directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'];
    expect(list).notEqual(expected);
  });

  it('Should be equals to list all files and directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest`);
    const list = dir.getFilesAndDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4',
      'emptyDirectory',
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt',
    ];
    expect(list).notEqual(expected);
  });

  it('Should be equals to empty list', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getFilesAndDirectories();
    const expected = [];
    expect(list).toEqual(expected);
  });

  it('Should be list only the files in directory', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/dir1`);
    const list = dir.getFiles();
    const expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt',
    ];
    expect(list).toEqual(expected);
  });

  it('Should be equals to empty list', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getFiles();
    const expected = [];
    expect(list).toEqual(expected);
  });
});
