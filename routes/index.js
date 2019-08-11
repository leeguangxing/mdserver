const router = require('koa-router')();
const mdRender = require('markdown-it')({html: true});
const mdObj = require('../public/md');
const flatten = require('flat');
const {buildIndexPage} = require('../views/index');
const {buildContentPage} = require('../views/buildContentPage');

let mapRouters = [];

Object.keys(flatten(mdObj)).forEach((key) => {
    mapRouters.push('/' + key.replace(/\./g, '/'));
});

const pathToText = (path) => {
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

const createMdHtml = (path) => {
    const mdContent = pathToText(path);
    return buildContentPage(mdRender.render(mdContent));
};

// index router
router.get('/', async (ctx, next) => {
    ctx.body = buildIndexPage();
});

// all routers by ./config.js
for (let i = 0; i < mapRouters.length; i++) {
    router.get(mapRouters[i], async (ctx, next) => {
        ctx.body = createMdHtml(ctx.path);
    });
}

module.exports = router;
