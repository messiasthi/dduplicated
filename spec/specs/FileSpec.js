import install from 'jasmine-es6';
import File from '../src/modules/File';

// Prepare the jasmine
install();

/**
 * Create the session of tests
 * @param  {String} FindLister Test session name
 * @param  {function}            Cases of test
 * @return {void}
 */

describe('File', () => {
  it('Should be list all files', () => {
    const list = File.list(`${process.env.PWD}/spec/dirTest`);
    const expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt'];
    expect(list).toEqual(expected);
  });

  it('Should be equals empty list of files', () => {
    const list = File.list(`${process.env.PWD}/spec/dirTest/emptyFile`);
    const expected = [];
    expect(list).toEqual(expected);
  });

  it('Should be not equals empty list of files', () => {
    const list = File.list(`${process.env.PWD}/spec/dirTest/emptyFile`);
    const expected = [
      'test1.txt',
      'test2.txt',
      'test3.txt',
      'test4.txt'];
    expect(list).notEqual(expected);
  });
});
