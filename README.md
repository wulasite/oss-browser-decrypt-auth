# OSS-Browser-Decrypto

## 简介

项目中遇到需要解密的值，所以看了下源码怎么解密的，可以看到cipher.js

```js
angular.module("web").factory("Cipher", function () {
  var crypto = require("crypto");
  var ALGORITHM = "aes192";
  var KEY = "x82m#*lx8vv";

  return {
    cipher: cipher,
    decipher: decipher,
  };

  function cipher(buf, key, algorithm) {
    if (!buf instanceof Buffer) {
      buf = new Buffer(buf);
    }
    var encrypted = "";
    var cip = crypto.createCipher(algorithm || ALGORITHM, key || KEY);
    encrypted += cip.update(buf, "utf8", "hex");
    encrypted += cip.final("hex");
    return encrypted;
  }

  function decipher(encrypted, key, algorithm) {
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm || ALGORITHM, key || KEY);
    decrypted += decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
});

```

表示有点看不懂，看了文档之后发现调用的是openssl库，经验证是aes-192-cbc，但是又无IV，在Python中复现这个函数比较难，不管是从填充还是盐的角度（密码学不行），所以直接拿nodejs写就完事了。

## 使用方法

1. 安装node

2. 安装crypto和sqlite3库

   ```
   npm install crypto
   npm install sqlite3
   ```

3. 修改localstorage位置

4. 运行

   ```
   npm oss-decrypt.js
   ```

   如果报错，可以尝试把auth-his换成auth-info，根据具体情况来吧，原理是这么一个原理。

