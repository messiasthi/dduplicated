#! /usr/bin/env node

var shell = require('shelljs');

var resultLS = shell.exec("ls -l", {silent: false}).output;
// console.log(JSON.stringify(resultLS));
// console.log(resultLS);
