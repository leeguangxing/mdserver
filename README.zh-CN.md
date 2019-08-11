[English](/blob/master/README.md) | 简体中文

# 使用说明

该脚手架用于快速创建 md 文档本地 web 服务，并在修改文档后自动同步到浏览器。它会自动实现服务器端渲染和动态路由的创建。您只需要关心 md 文档的编写，和主页面 a 标签目录的创建。它非常适合于 md 文档需要独立于项目代码的情景。当然可以随时扩展它。

## 安装和启动

1、安装依赖：
```bash
yarn install
```
2、启动本地 web 服务 demo：
```bash
yarn start
```

## 添加 md 文档

1、/public/md 目录下的 .md 文件会被自动映射到 web 服务的 RESTful 路由上。如 /public/md/part1/block1.md 会被映射到 /part1/block1 上。images 会作为保留目录名称，不被映射。
同时 /public 亦为 web 服务器的静态目录。.md 中的图片路径使用如：http://localhost/md/part1/images/1.png 或 /md/part1/images/1.png。

2、在 /views/index.js 首页视图添加 html 链接。

## 自动更新

koa2 服务的自动重启使用了 node-dev（80端口）。

.md 文件修改的浏览器自动刷新使用了 browser-sync（3000端口）。

注意，修改 /views/index.js 后，需要手动刷新浏览器，因为未做到 koa2 服务器端重启后通知浏览器刷新。
