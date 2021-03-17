const aes256 = require('aes256');

const key = "jodfwlkdnw24nklds08jdsfwjo02lksnfl815w";

export const txtEncrypt = (text) => {
    const encrypted = aes256.encrypt(text, key);

    return encrypted;
};

export const txtDecrypt = (encryptedMsg, username) => {
    if (encryptedMsg.startsWith(username)) {
        return encryptedMsg;
    } else if (encryptedMsg.startsWith("Welcome")) {
        return encryptedMsg;
    }

    const decrypted = aes256.decrypt(key, encryptedMsg);

    return decrypted;
}