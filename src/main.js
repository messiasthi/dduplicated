#! /usr/bin/env node
// import { Directory } from './src/modules/Directory';
// import File from './src/modules/File';
// Named export to non command line applications

// Define possible commands
const commands = {
  path: 'path',
  detect: 'detect',
  delete: 'delete',
  link: 'link',
  help: 'help'
};

/**
 * Show all help commands
 */
function help(arg) {
  const helpTopics = {
    path: 'The path to search duplicated files.',
    detect: '[Default]Detect the files duplicated in directory',
    delete: 'Delete any duplicated file, only the first detection remain',
    link: 'Delete any duplicated file, only the first detection remain but, create a link in each detection to first detection',
    help: 'Show this help',
  };

  console.log('Commands:');
  console.log('dduplicated <command> <path> [<path>');
  if (arg && arg in helpTopics) {
    console.log(`    ${arg}\t\t${helpTopics[arg]}`);
  } else {
    for (const item in helpTopics) {
      if (item in helpTopics) {
        console.log(`    ${item}\t\t${helpTopics[item]}`);
      }
    }
  }
}

let paths = [];
let command = commands.detect;
function preparePaths(initial) {
  paths = [];
  for (let i = initial; i < process.argv.length; i + 1) {
    paths.push(process.argv[i]);
  }
}

// Check parameters
if (typeof process.argv[3] === 'undefined') {
  command = commands.detect;
  paths = ['.'];
} else if (process.argv[3] === commands.help) {
  help();
} else if (process.argv[3] in commands) {
  command = commands[process.argv[3]];
  preparePaths(4);
} else {
  command = commands.detect;
  preparePaths(3);
}

console.log(paths, Array.isArray(paths));

console.log(command);
