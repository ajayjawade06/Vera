const argon2 = require('argon2');

const hashData = async (data) => {
  try {
    return await argon2.hash(data);
  } catch (err) {
    throw new Error('Hashing failed');
  }
};

const verifyHash = async (hash, data) => {
  try {
    return await argon2.verify(hash, data);
  } catch (err) {
    return false;
  }
};

module.exports = { hashData, verifyHash };
