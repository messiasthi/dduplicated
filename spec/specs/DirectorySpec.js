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
    const list = Directory.list(`${process.env.PWD}/spec/dirTest`);
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'];
    expect(list).toEqual(expected);
  });

  it('Should be equals empty list of directories', () => {
    const list = Directory.list(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const expected = [];
    expect(list).toEqual(expected);
  });

  it('Should be not equals empty list of directories', () => {
    const list = Directory.list(`${process.env.PWD}/spec/dirTest/emptyDirectory`);
    const expected = [
      'dir1',
      'dir2',
      'dir3',
      'dir4'];
    expect(list).notEqual(expected);
  });
});
