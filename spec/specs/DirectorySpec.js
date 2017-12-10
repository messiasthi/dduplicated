const jasmine = require('jasmine');
const Directory = require('../../es5/src/modules/Directory');

/**
 * Create the session of tests
 * @param  {String} FindLister Test session name
 * @param  {function}            Cases of test
 * @return {void}
 */

describe('Directory', () => {

  beforeAll(() => {
    console.log('All tests are runing on this directory', process.env.PWD);
  });

  it('Should be equals to list all directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest`);
    const list = dir.getDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4',
      'emptyDirectory'];
    expect(list).toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be equals empty list of directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getDirectories();
    const expected = [];
    expect(list).toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be not equals to list of directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'];
    expect(list).not.toEqual(jasmine.arrayContaining(expected));
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
    expect(list).not.toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be equals to empty list', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getFilesAndDirectories();
    const expected = [];
    expect(list).toEqual(jasmine.arrayContaining(expected));
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
    expect(list).toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be equals to empty list', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getFiles();
    const expected = [];
    expect(list).toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be add the new item in directory list', () => {
    const dir = new Directory(`${process.env.PWD}/spec`);
    dir.addDirectory('dirTest/dir1');
    const expected = [
      'specs',
      'support',
      'dirTest',
      'dirTest/dir1'];
    expected(dir.getDirectories).toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be fail on add the new item in directory list', () => {
    const dir = new Directory(`${process.env.PWD}/spec`);
    dir.addDirectory('dirTest/dir1/text1.txt');
    const expected = [
      'specs',
      'support',
      'dirTest',
      'dirTest/dir1/text1.txt'];
    expected(dir.getDirectories).not.toEqual(jasmine.arrayContaining(expected));
  });

  it('Should be fail on add the new item in file list', () => {
    const dir = new Directory(`${process.env.PWD}/spec`);
    dir.addDirectory('dirTest/dir1');
    const expected = [
      'run.js',
      'dirTest/dir1'];
    expected(dir.getDirectories).not.toEqual(jasmine.arrayContaining(expected));
  });
});
