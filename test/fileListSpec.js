/* global describe it expect */
/**
 * Create the session of tests
 * @param  {String} 'FindLister' Test session name
 * @param  {function}            Cases of test
 * @return {void}
 */
describe('FileLister', function() {
  // Load module to test
  var lister = require('../src/modules/lister');

  it('should be list only the files in directory', function() {
    var fileList = lister.listFile('test/dirTest');
    var expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt'
    ];
    expect(fileList).toEqual(expected);
  });

  it('should be list only directories', function() {
    var dirList = lister.listDir('test/dirTest');
    var expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'
    ];
    expect(dirList).toEqual(expected);
  });

  it('should be list all files and directories', function() {
    var list = lister.list('test/dirTest');
    var expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4',
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt'
    ];
    expect(list).toEqual(expected);
  });
});
