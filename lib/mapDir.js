const fs = require('fs');
const path = require('path');

/**
 * map directory and file to javascript object
 */
const mapDir = d => {

  const tree = {};

  let dirs = [], files = [];
  const currentDirs = fs.readdirSync(d);
  for (let i = 0; i < currentDirs.length; i++) {
    const currentDir = currentDirs[i];
    const isDir = fs.statSync(path.join(d, currentDir)).isDirectory();
    if (isDir) {
      dirs.push(currentDir);
    } else {
      files.push(currentDir);
    }
  }

  // recurse directory
  dirs.forEach(dir => {
    // filter images directory
    // if (dir !== 'images') {
    //   tree[dir] = mapDir(path.join(d, dir));
    // }
    tree[dir] = mapDir(path.join(d, dir));
  });

  // map files of current directory
  files.forEach(file => {
    // .md file
    if (path.extname(file) === '.md') {
      // filter .md and set as attribute which returns file text
      tree[path.basename(file, '.md')] = () => fs.readFileSync(path.join(d, file), {encoding: 'utf8'});
    }
  });

  return tree;
};

// map from __dirname
module.exports = mapDir;
