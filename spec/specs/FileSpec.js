import File from '../../src/modules/File';

/**
 * Create the session of tests
 * @param  {String} Session Test session name
 * @param  {function} Cases Cases to of test
 * @return {void}
 */

describe('File', () => {
  it('Should be equals to hash', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(file.getHash()).toBe(expected);
  });

  it('Should not be equals to hash', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(file.getHash()).not.toBe(expected);
  });

  it('Should be equals to path of file', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = `${process.env.PWD}/spec/dirTest/test1.txt`;
    expect(file.getPath()).toBe(expected);
  });

  it('Should be not equals to path of file', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = `${process.env.PWD}/spec/dirTest/test2.txt`;
    expect(file.getPath()).not.toBe(expected);
  });

  it('Should be equals to file name', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'test1.txt';
    expect(file.getName()).toBe(expected);
  });

  it('Should be equals to file name', () => {
    const file = new File(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'test2.txt';
    expect(file.getName()).not.toBe(expected);
  });
});
