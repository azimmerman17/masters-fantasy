const crypto = require('crypto');
require('dotenv').config()

const encryptValue = (text) => {
  let ivLength = Number(process.env.IV_LENGTH)
  let encryptionKey = process.env.ENCRYPTION_KEY
  let algorithm =  process.env.ALGORITHM
  let iv = crypto.randomBytes(ivLength)

  // only utilizes the first 32 characters
  let key = encryptionKey.slice(0, 32);

  let cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

module.exports = encryptValue