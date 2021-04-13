#!/usr/bin/env node
const program = require('commander')

program.version(require("../package.json").version)

// kkb init abc

program
    .command("init <name>")
    .description('init project')
    .action((name) => {
      console.log("init" + name);
    })

program.parse(process.argv);

