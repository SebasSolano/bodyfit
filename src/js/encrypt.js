import CryptoJS from "crypto-js";

function encrypt(valueString) {
  const key = "MySecureEncryptionKey"; // Clave de encriptación más segura
  const encryptedValue = CryptoJS.AES.encrypt(valueString, key).toString();
  return encryptedValue;
}

export { encrypt };
