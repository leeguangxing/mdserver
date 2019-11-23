const fs = require("fs");
const router = require('koa-router')();
const mdRender = require('markdown-it')({html: true});
const mdObj = require('../public/md');
const flatten = require('flat');
const {buildContentPage} = require('../views/buildContentPage');

let mapRouters = [];
const navConfigJsonPath = './nav.config.json';

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
    const jsonExist = fs.existsSync(navConfigJsonPath);
    if (jsonExist) {
        // create by json

        // use require for hot update
        const content = require('../nav.config');
        /*
        const contentString = fs.readFileSync(navConfigJsonPath, {encoding: 'utf8'});
        const content = JSON.parse(contentString);
        */
        const recurseJson = function (arr) {
            let lists = '';
            for (let i = 0; i < arr.length; i++) {
                const currentNode = arr[i];
                if (currentNode.children) {
                    lists += currentNode.link ?
                        `<li><a href="${currentNode.link}" target="_self" class="markdown-article">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>` :
                        `<li><a class="markdown-article-text">${currentNode.title}</a>${recurseJson(currentNode.children)}</li>`;
                } else {
                    lists += currentNode.link ?
                        `<li><a href="${currentNode.link}" target="_self" class="markdown-article">${currentNode.title}</a></li>` :
                        `<li><a class="markdown-article-text">${currentNode.title}</a></li>`;
                }
            }
            return `<ul class="markdown-articles">${lists}</ul>`;
        };
        return recurseJson(content);
    } else {
        // create by directory
        const recurseObject = function (obj, path) {
            // @path is used to trace
            let lists = '';
            const keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
                const currentNode = obj[keys[i]];
                if (Object.keys(currentNode).length) {
                    lists += `<li><a class="markdown-article-text">${keys[i]}</a>${recurseObject(currentNode, path + keys[i] + '/')}</li>`;
                } else {
                    lists += `<li><a href="${path + keys[i]}" target="_self" class="markdown-article">${keys[i]}</a></li>`;
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
    ctx.body = createMdHtml(mapRouters[0]);
});

for (let i = 0; i < mapRouters.length; i++) {
    router.get(mapRouters[i], async (ctx, next) => {
        ctx.body = createMdHtml(ctx.path);
    });
}

module.exports = router;
