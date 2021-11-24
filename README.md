# PADMÉ implementation for JS

PADMÉ limits information leakage about the length of the plaintext for a wide range of encrypted data sizes.

See the paper for more [details](https://bford.info/pub/sec/purb.pdf).



```javascript
const paddingLength = require("padme");

console.log(paddingLength(message.length));

```