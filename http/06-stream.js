const fs = require('fs');

const rs = fs.createReadStream('./1.png')
const ws = fs.createWriteStream('./12.png')
rs.pipe(ws)
