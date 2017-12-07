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
  it('Should be list all directories', () => {
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

  it('Should be not equals empty list of directories', () => {
    const dir = new Directory(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const list = dir.getDirectories();
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'];
    expect(list).notEqual(expected);
  });

  it('Should be list all files and directories', () => {
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

  it('Should be list all files and directories', () => {
    const list = Lister.listAll(`${process.env.PWD}/spec/dirTest`);
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
    expect(list).toEqual(expected);
  });

  it('Should be list only the files in directory', () => {
    const fileList = Lister.listFiles(`${process.env.PWD}/spec/dirTest`);
    const expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt',
    ];
    expect(fileList).toEqual(expected);
  });

  it('Should be list only directories', () => {
    const dirList = Lister.listDir(`${process.env.PWD}/spec/dirTest`);
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4',
    ];
    expect(dirList).toEqual(expected);
  });
});
