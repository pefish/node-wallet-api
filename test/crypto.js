const assert = require("assert");
const crypto = require('../src/utils/crypto')

describe('crypto', () => {
  it('toBase64', async () => {
    assert.equal(crypto.toBase64('TLMLDjNxzcrezhd6jXSVrN6V2RMpUhUCGJ'), 'QXHgb0fZO+zPkQ6MUSzWDAdAKQfc');
  });
});
