
var bcrypt = require("bcryptjs");

console.log("zorzihomes" ,bcrypt.hashSync("zorzihomes", bcrypt.genSaltSync(10), null))
console.log("summithomes" ,bcrypt.hashSync("summithomes", bcrypt.genSaltSync(10), null))
console.log("will" ,bcrypt.hashSync("will", bcrypt.genSaltSync(10), null))
console.log("vince" ,bcrypt.hashSync("vince", bcrypt.genSaltSync(10), null))
console.log("naresh" ,bcrypt.hashSync("naresh", bcrypt.genSaltSync(10), null))
console.log("aysha" ,bcrypt.hashSync("aysha", bcrypt.genSaltSync(10), null))