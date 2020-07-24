// 该脚本用于清理 md 目录下多余的文件和目录
// 用法：
// node clear-md-directory.js

const fs = require('fs');
const path = require('path');
const config = require('./nav.config.json');

const {save, exclude} = config;
const directory = path.join(__dirname, 'public/md');

const clearExtraFiles = folder => {

  let dirs = [], files = [];
  const currentDirs = fs.readdirSync(folder);
  for (let i = 0; i < currentDirs.length; i++) {
    const currentDir = currentDirs[i];
    const isDir = fs.statSync(path.join(folder, currentDir)).isDirectory();
    if (isDir) {
      dirs.push(currentDir);
    } else {
      files.push(currentDir);
    }
  }

  dirs.forEach(dir => {
    clearExtraFiles(path.join(folder, dir));
  });

  files.forEach(file => {
    if (save.indexOf(path.extname(file)) === -1) {
      const currentFilePath = path.join(folder, file);
      // if (currentFilePath !== path.join(__dirname, 'public/md/index.js')) {
      //   fs.unlinkSync(currentFilePath);
      // }
      fs.unlinkSync(currentFilePath);
    }
  });
};

const removeEmptyDirFolders = (folder) => {

  const isDir = fs.statSync(folder).isDirectory();
  if (!isDir) {
    return;
  }
  let files = fs.readdirSync(folder);
  if (files.length > 0) {
    files.forEach(function (file) {
      const fullPath = path.join(folder, file);
      removeEmptyDirFolders(fullPath);
    });
    files = fs.readdirSync(folder);
  }

  if (files.length === 0) {
    fs.rmdirSync(folder);
  }
}

const removeDir = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(path + '/' + filename).isDirectory()) {
          removeDir(path + '/' + filename);
        } else {
          fs.unlinkSync(path + '/' + filename);
        }
      })
      fs.rmdirSync(path);
    } else {
      fs.rmdirSync(path);
    }
  } else {
    console.log('Directory path not found.')
  }
};

if (exclude && exclude.length) {
  for (let i = 0; i < exclude.length; i++) {
    removeDir(path.join(__dirname, 'public/md', exclude[i]));
  }
}
clearExtraFiles(directory);
removeEmptyDirFolders(directory);
