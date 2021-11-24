# PADMÉ implementation for JS

PADMÉ limits information leakage about the length of the plaintext for a wide range of encrypted data sizes.

See the paper for more [details](https://bford.info/pub/sec/purb.pdf).

<br>

installation:

`npm install padme`

<br>

usage :

```javascript
const paddingLength = require("padme");

console.log(paddingLength(message.length));

```

[sh-dv](https://github.com/sh-dv)