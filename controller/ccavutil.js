const crypto = require("crypto");

function encrypt(plainText, workingKey) {

  console.log(plainText, workingKey,"dafdafnadn");
  const key = crypto.createHash("md5").update(workingKey).digest();
  const iv = Buffer.from("1234567890abcdef", "utf8");
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}


 

function decrypt(encText, workingKey) {
  const key = crypto.createHash("md5").update(workingKey).digest();
  const iv = Buffer.from("1234567890abcdef", "utf8");
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt,
};
