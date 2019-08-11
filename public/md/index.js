const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * map directory and file to javascript object
 */
const mapDir = d => {

    const tree = {};

    const [dirs, files] = _.partition(
        fs.readdirSync(d),
        p => fs.statSync(path.join(d, p)).isDirectory()
    );

    // recurse directory
    dirs.forEach(dir => {
        // filter images directory
        if (dir !== 'images') {
            tree[dir] = mapDir(path.join(d, dir));
        }
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
module.exports = mapDir(path.join(__dirname));
