// Load module to test
import install from 'jasmine-es6';
import Lister from '../src/modules/Lister';

// Prepare the jasmine
install();

/**
 * Create the session of tests
 * @param  {String} FindLister Test session name
 * @param  {function}            Cases of test
 * @return {void}
 */

describe('FileLister', () => {
  it('should be list only the files in directory', () => {
    const fileList = Lister.listFile('spec/dirTest');
    const expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt',
    ];
    expect(fileList).toEqual(expected);
  });

  // it('should be list only directories', () => {
  //   const dirList = Lister.listDir('spec/dirTest');
  //   const expected = [
  //     'dir1',
  //     'dir2',
  //     'dir3',
  //     'dir4',
  //   ];
  //   expect(dirList).toEqual(expected);
  // });
  //
  // it('should be list all files and directories', () => {
  //   const list = Lister.list('spec/dirTest');
  //   const expected = [
  //     'dir1',
  //     'dir2',
  //     'dir3',
  //     'dir4',
  //     'test1.txt',
  //     'test2.txt',
  //     'test3.txt',
  //     'test4.txt',
  //   ];
  //   expect(list).toEqual(expected);
  // });
});
