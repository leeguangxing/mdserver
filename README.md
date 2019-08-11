English | [简体中文](/blob/master/README.zh-CN.md)

# Introduction

The scaffolding is used to quickly create local web services for MD documents and automatically synchronize to browsers after modifying documents. It automatically implements server-side rendering and dynamic routing creation. You only need to care about the writing of MD documents and the creation of html links on the index page.It is convenient when MD documents need to be independent of project code. Also, it can be easily expanded.

## Install and start

1、Install dependencies：
```bash
yarn install
```
2、Start the local web server demo：
```bash
yarn start
```

## Add md document

1、The .md file in the directory /public/md is automatically mapped to the RESTful routers of the web service. For example, /public/md/part1/block1.md will be mapped to /part1/block1. Directory name ~~images~~ are retained and not be mapped. Also, /public is also the static directory of the web server. The image path in .md file can be used as http://localhost/md/part1/images/1.png or /md/part1/images/1.png.

2、 Add html link in /views/index.js index view.

## Auto restart

Use node-dev to restart koa2 server (use port 80).

Use browser-sync to reload browser when .md file was Changed (use port 3000).

Notice, when /views/index.js was changed, you need to refresh browser by yourself, because the browser don't know the koa2 server restart.
