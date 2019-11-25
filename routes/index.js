const fs = require("fs");
const router = require('koa-router')();
const mdRender = require('markdown-it')({html: true});
const mdObj = require('../public/md');
const flatten = require('flat');
const {buildContentPage} = require('../views/buildContentPage');

let mapRouters = [];
let json;
try {
  json = require('../nav.config.json');
} catch (e) {
  json = false;
}

const navConfigJsonPath = '../nav.config.json';

Object.keys(flatten(mdObj)).forEach((key) => {
  mapRouters.push('/' + key.replace(/\./g, '/'));
});

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

const createNavHtml = () => {
  if (json) {
    // create by json
    const recurseJson = function (arr) {
      let lists = '';
      for (let i = 0; i < arr.length; i++) {
        const currentNode = arr[i];
        if (currentNode.children) {
          lists += currentNode.link ?
            `<li><a href="${currentNode.link}" target="_self" class="markdown-article" title="${currentNode.title}">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>` :
            `<li><a class="markdown-article-text" title="${currentNode.title}">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>`;
        } else {
          lists += currentNode.link ?
            `<li><a href="${currentNode.link}" target="_self" class="markdown-article" title="${currentNode.title}">${currentNode.title}</a></li>` :
            `<li><a class="markdown-article-text" title="${currentNode.title}">${currentNode.title}</a></li>`;
        }
      }
      return `<ul class="markdown-articles">${lists}</ul>`;
    };
    return recurseJson(json.menus);
  } else {
    // create by directory
    const recurseObject = function (obj, path) {
      // @path is used to trace
      let lists = '';
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const currentNode = obj[keys[i]];
        if (Object.keys(currentNode).length) {
          lists += `<li><a class="markdown-article-text" title="${keys[i]}">${keys[i]}</a>${recurseObject(currentNode, path + keys[i] + '/')}</li>`;
        } else {
          lists += `<li><a href="${path + keys[i]}" target="_self" class="markdown-article" title="${keys[i]}">${keys[i]}</a></li>`;
        }
      }
      return `<ul class="markdown-articles">${lists}</ul>`;
    };

    return recurseObject(mdObj, '/');
  }
};

const createMdHtml = (path) => {
  if (path) {
    const mdContent = pathToPlainText(path);
    return buildContentPage(mdRender.render(mdContent), createNavHtml());
  } else {
    return buildContentPage();
  }
};

// dynamic routers
router.get('/', async (ctx, next) => {
  if (json) {
    ctx.body = createMdHtml(json.indexLink);
  } else {
    ctx.body = createMdHtml(mapRouters[0]);
  }
});

for (let i = 0; i < mapRouters.length; i++) {
  router.get(mapRouters[i], async (ctx, next) => {
    ctx.body = createMdHtml(ctx.path);
  });
}

module.exports = router;
