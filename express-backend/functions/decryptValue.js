const crypto = require('crypto');
require('dotenv').config()

const decryptValue = (text) => {
  let encryptionKey = process.env.ENCRYPTION_KEY
  let algorithm =  process.env.ALGORITHM

  // only utilizes the first 32 characters
  let key = encryptionKey.slice(0, 32);

  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
}

module.exports = decryptValue
