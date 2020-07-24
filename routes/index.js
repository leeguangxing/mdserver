const fs = require('fs');
const path = require('path');
const router = require('koa-router')();
// 允许在 markdown 中使用 html 语法
const mdRender = require('markdown-it')({html: true});
const mapDir = require('../lib/mapDir');
const flatten = require('flat');
const {buildContentPage} = require('../views/buildContentPage');

const mdObj = mapDir(path.join(__dirname, '../public/md'));

let mapRouters = [];
let navConfigJson;
try {
  navConfigJson = require('../nav.config.json');
} catch (e) {
  navConfigJson = false;
}

const navConfigJsonPath = '../nav.config.json';

// 根据目录对象生成扁平路由数组
Object.keys(flatten(mdObj)).forEach((key) => {
  mapRouters.push('/' + key.replace(/\./g, '/'));
});

// 根据路径获取目录对象内容
const pathToPlainText = (path) => {
  const attr = path.split('/');
  attr.splice(0, 1);
  let res = mdObj;
  for (let i = 0; i < attr.length; i++) {
    res = res[attr[i]];
    if (i === attr.length - 1) {
      return res();
    }
  }
};

// 递归生成左侧菜单
const createNavHtml = () => {
  if (navConfigJson && !navConfigJson.useDirectoryNav) {
    // 根据 nav.config.json 生成
    const recurseJson = function (arr) {
      let lists = '';
      for (let i = 0; i < arr.length; i++) {
        const currentNode = arr[i];
        if (currentNode.children) {
          lists += currentNode.link ?
            `<li><a onclick="renderMenuContent('${currentNode.link}')" data-path="${currentNode.link}" target="_self" class="markdown-article" title="${currentNode.title}">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>` :
            `<li><a class="markdown-article-text" title="${currentNode.title}">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>`;
        } else {
          // 配置中允许直接打开静态资源文件
          lists += currentNode.link ? (
              currentNode.staticFile ? `<li><a href="${currentNode.link}" target="_blank" class="markdown-article" title="${currentNode.title}">${currentNode.title}</a></li>` :
              `<li><a onclick="renderMenuContent('${currentNode.link}')" data-path="${currentNode.link}" target="_self" class="markdown-article" title="${currentNode.title}">${currentNode.title}</a></li>`
            ) : `<li><a class="markdown-article-text" title="${currentNode.title}">${currentNode.title}</a></li>`;
        }
      }
      return `<ul class="markdown-articles">${lists}</ul>`;
    };
    return recurseJson(navConfigJson.menus);
  } else {
    // 根据 md 目录结构生成
    const recurseObject = function (obj, path) {
      let lists = '';
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const currentNode = obj[keys[i]];
        if (Object.keys(currentNode).length) {
          lists += `<li><a class="markdown-article-text" title="${keys[i]}">${keys[i]}</a>${recurseObject(currentNode, path + keys[i] + '/')}</li>`;
        } else {
          // 非 md 节点不作渲染
          if(typeof currentNode === 'function') {
            lists += `<li><a onclick="renderMenuContent('${path + keys[i]}')" data-path="${path + keys[i]}" target="_self" class="markdown-article" title="${keys[i]}">${keys[i]}</a></li>`;
          }
        }
      }
      return `<ul class="markdown-articles">${lists}</ul>`;
    };

    return recurseObject(mdObj, '/');
  }
};

// 生成整个页面或者内容区域 html
const createMdHtml = (path, onlyContent) => {
  if (path) {
    const mdContent = pathToPlainText(path);
    if(onlyContent) {
      return mdRender.render(mdContent);
    } else {
      return buildContentPage(mdRender.render(mdContent), createNavHtml(), navConfigJson.title);
    }
  } else {
    return buildContentPage();
  }
};

// 根据 md 文档目录生成动态响应路由
router.get('/', async (ctx, next) => {
  if (navConfigJson && !navConfigJson.useDirectoryNav) {
    ctx.body = createMdHtml(navConfigJson.indexLink);
  } else {
    ctx.body = createMdHtml(navConfigJson.indexLink || mapRouters[0]);
  }
});

router.post('/', async (ctx, next) => {
  if (navConfigJson && !navConfigJson.useDirectoryNav) {
    ctx.body = createMdHtml(navConfigJson.indexLink, true);
  } else {
    ctx.body = createMdHtml(navConfigJson.indexLink || mapRouters[0],true);
  }
});

for (let i = 0; i < mapRouters.length; i++) {
  // 同构 get 请求
  router.get(mapRouters[i], async (ctx, next) => {
    ctx.body = createMdHtml(ctx.path);
  });
  // 异步 post 请求
  router.post(mapRouters[i], async (ctx, next) => {
    ctx.body = createMdHtml(ctx.path, true);
  });
}

module.exports = router;
