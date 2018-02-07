#! /usr/bin/env node
import { getDuplicatesSync, getDuplicates, DuplicateScan } from './modules/DuplicateScan';

// Named export to non command line applications
export default DuplicateScan;
export { getDuplicatesSync, getDuplicates };

// Define possible commands
const commands = {
  path: 'path',
  detect: 'detect',
  delete: 'delete',
  link: 'link',
  help: 'help',
};

// Initialize vars
const paths = [];
let command = commands.detect;

/**
 * Show all help commands
 * @param {String} arg The command specific to show help only for it
 */
function help(arg) {
  const helpTopics = {
    path: '\tThe path to search duplicated files.',
    detect: '[Default]Detect the files duplicated in directory',
    delete: 'Delete any duplicated file, only the first detection remain',
    link: '\tDelete any duplicated file, only the first detection remain but, create a link in each detection to first detection',
    help: '\tShow this help',
  };

  console.log('Commands:');
  console.log('dduplicated <command> <path> [<path>');
  if (arg && arg in helpTopics) {
    console.log(`\t--${arg}\t${helpTopics[arg]}`);
  } else {
    for (const item in helpTopics) {
      if (item in helpTopics) {
        console.log(`\t--${item}\t${helpTopics[item]}`);
      }
    }
  }
}

function detect(pths) {
  // const files = [];
  // for (const p of pths) {
  //   files.push(getDuplicatesSync(p));
  // }
  return getDuplicatesSync(pths[0]);
  // return new Promise((resolve, reject) => {
  //   const duplicates = [];
  //   for (const path of pths) {
  //     getDuplicates(path).then((files) => {
  //       duplicates.push(files);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // });
}

/**
 * Process the parameters in command line
 * @return {Void}
 */
function processParameters() {
  if (process.argv.length > 2) {
    // Get the command
    if (process.argv[2].substr(0, 2) === '--') {
      command = process.argv[2].substr(2);
    } else {
      // Get the first path
      paths.push(process.argv[2]);
    }
    // Process the others paths
    for (let i = 3; i < process.argv.length; i++) {
      paths.push(process.argv[i]);
    }
  } else {
    paths.push('.');
  }
}

// Check parameters
processParameters();

if (command in commands) {
  if (command === 'help') {
    help(paths[0]);
  } else if (command === 'detect') {
    detect(paths);
  } else if (command === 'link') {
    detect(paths);
  } else if (command === 'delete') {
    detect(paths);
  }
} else {
  help();
}
console.log(paths, command);
