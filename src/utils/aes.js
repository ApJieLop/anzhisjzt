import CryptoJS from 'crypto-js';

export default {
  // //随机生成指定数量的16进制key
  // generatekey(num) {
  //   let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   let key = "";
  //   for (var i = 0; i < num; i++) {
  //     let randomPoz = Math.floor(Math.random() * library.length);
  //     key += library.substring(randomPoz, randomPoz + 1);
  //   }
  //   return key;
  // },

  encrypt(data) {//加密
    let key = CryptoJS.enc.Utf8.parse('b4b6a4dfaf204a5d9d26cf96090ea5b4');
    let iv = CryptoJS.enc.Utf8.parse('123456789ERW3456');
    let encrypted = CryptoJS.AES.encrypt(data, key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
    // return encrypted.replace(new RegExp(/\+/g, 'gm'), '-').replace(new RegExp(/\//g, 'gm'), '_');
    return encrypted
  },

  decrypt(encrypted) {
    let key = CryptoJS.enc.Utf8.parse('b4b6a4dfaf204a5d9d26cf96090ea5b4');
    let iv = CryptoJS.enc.Utf8.parse('123456789ERW3456');
    // encrypted = encrypted.toString().replace(new RegExp(/-/g, 'gm'), '+').replace(new RegExp(/_/g, 'gm'), '/')
    encrypted = encrypted.toString();
    let decrypted = CryptoJS.AES.decrypt(encrypted, key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  }
}

