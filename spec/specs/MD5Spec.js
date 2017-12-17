import { getHash } from '../../src/helpers/MD5';
/**
 * Create the session of tests
 * @param  {String} Session Test session name
 * @param  {function} Cases Cases to of test
 * @return {void}
 */
describe('MD5', () => {
  it('Should be equals to file 1 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 1 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test1.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 2 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test2.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 2 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test2.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 3 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test3.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 3 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test3.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 4 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test4.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 4 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/test4.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 1 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test1.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 1 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test1.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 2 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test2.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 2 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test2.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 3 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test3.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 3 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test3.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

  it('Should be equals to file 4 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test4.txt`);
    const expected = 'f5c85408e67ef9a90f3e416863ba84de';
    expect(hash).toBe(expected);
  });

  it('Should be not equals to file 4 hash', () => {
    const hash = getHash(`${process.env.PWD}/spec/dirTest/dir1/test4.txt`);
    const expected = 'f6c85408e67ef9a90f3e416863ba84de';
    expect(hash).not.toBe(expected);
  });

});
