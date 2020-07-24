// 该脚本用于将 nav.config.json 的目录数据自动转换为 README.md，旨在保持唯一数据源的原则。
// 用法：
// node convert-nav-to-readme.js

const fs = require('fs');
const json = require('./nav.config.json');

let content = '';
const menus = json.menus;

function recurseChildrenMenu(childrenArray, tab) {
  tab++;
  for (let i = 0; i < childrenArray.length; i++) {
    const menu = childrenArray[i];
    const tabSpace = '  '.repeat(tab - 1);
    if (menu.link) {
      if (menu.staticFile) {
        content += `${tabSpace}- [${menu.title}](${menu.link.replace('/md', '')})\n`;
      } else {
        content += `${tabSpace}- [${menu.title}](${menu.link}.md)\n`;
      }
    } else {
      content += `${tabSpace}- ${menu.title}\n`
    }
    // 递归子节点
    if (menu.children && menu.children.length) {
      recurseChildrenMenu(menu.children, tab);
    }
  }
}

// 一级标题
const title = json.title || 'Document';
content += `# ${title}\n\n`;


// 二级标题
if (menus.length) {
  for (let i = 0; i < menus.length; i++) {
    const subMenu = menus[i];
    if (subMenu.link) {
      if (subMenu.staticFile) {
        content += `## [${subMenu.title}](${subMenu.link.replace('/md', '')})\n\n`;
      } else {
        content += `## [${subMenu.title}](${subMenu.link}.md)\n\n`;
      }
    } else {
      content += `## ${subMenu.title}\n\n`
    }
    // 递归子菜单
    if (subMenu.children && subMenu.children.length) {
      recurseChildrenMenu(subMenu.children, 0);
    }
    content += '\n';
  }
}

// 将内容写入文件
fs.writeFileSync('./README.md', content);
