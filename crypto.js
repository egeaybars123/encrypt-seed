const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const saltLength = 16;
const ivLength = 12; 
const keyLength = 32;

function deriveKey(password, salt) {
    return crypto.scryptSync(password, salt, keyLength);
}

function encryptSeed(seed, password) {
    const salt = crypto.randomBytes(saltLength);
    const iv = crypto.randomBytes(ivLength);
    const key = deriveKey(password, salt);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(seed, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag();

    return {
        salt: salt.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
        encryptedData: encrypted,
    };
}

function decryptSeed(encryptedData, password) {
    const { salt, iv, authTag, encryptedData: cipherText } = encryptedData;
    const key = deriveKey(password, Buffer.from(salt, "hex"));

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));
    decipher.setAuthTag(Buffer.from(authTag, "hex"));

    let decrypted = decipher.update(cipherText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = {
    encryptSeed, decryptSeed
}