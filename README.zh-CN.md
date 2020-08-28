[English](/README.md) | 简体中文

# 介绍

该脚手架基于 koa2 实现 md 文档的服务器端渲染。它可以帮助我们完成以下任务：  

1、快速创建 md 文档本地 web 服务，并在修改文档后自动同步到浏览器。

2、可以根据文档目录自动创建路由或者手动配置。

3、配合脚本和 Jenkins 等持续集成交付系统，可以保持项目和说明文档同步更新。

4、UI 可以支持在 PC 端和移动端浏览。

5、支持使用 html 标签。

Demo 地址：[https://leeguangxing.cn/mdserver_demo](https://leeguangxing.cn/mdserver_demo)

<br>

## 本地安装和启动

1、安装依赖：
```bash
yarn install
```
2、启动本地 web 服务 demo：
```bash
yarn start
```

<br>

## 自动更新

koa2 服务器的自动重启使用了 nodemon（默认 80 端口）。

koa2 重启后会请求 browser-sync 服务器刷新浏览器（browser-sync UI 3001 端口，浏览器打开页面端口为 3002，browser-sync 服务器监听端口为 3003）。

<br>

## 路由建立方式
koa2 端动态路由的生成过程是：   

1、由 /lib/mapDir.js 脚本生成映射目录结构的对象。 
 
2、然后使用 flat.js 将目录对象扁平化成路由路径。 
 
3、如果 nav.config.json 的 useDirectoryNav 设置为 true，则使用 json 直接构建路由。

<br>

## 环境变量
项目中使用以下环境变量：

|名称|说明|默认值|
|:---:|:---:|:---:|
|PORT|koa2的监听端口|80|
|NODE_ENV|设置为 production 时将不会输出日志信息，不会向 browser-sync 服务器 发送刷新请求|undefined|

<br>

## nav.config.json 配置
|属性|说明|是否必须|
|:---:|:---:|:---:|
|title|html文档标题|否|
|useDirectoryNav|是否根据目录生成|是|
|indexLink|首页路由路径|是|
|menus|菜单数组|当 useDirectoryNav 为 false 时必要|
|title|菜单标题|当 useDirectoryNav 为 false 时必要|
|link|菜单路由路径|当 useDirectoryNav 为 false 时必要|
|staticFile|是否作为静态文件打开，若是，路由路径前需要补充 /md/|否|

项目提供 clear-md-directory.js 脚本用于清理 public/md 目录下无关的文件和目录。如果你的说明文档和项目代码在同一目录下，这很有用。它会根据 nav.config.json 以下的配置进行清理：

|属性|说明|是否必须|
|:---:|:---:|:---:|
|save|需要保留的文件的后缀，至少需要保留 .md|是|
|exclude|需要整个删除的目录路径，相对于 public/md 的路径|否|

clear-md-directory.js 会做如下工作：  

1、清理 exclude 排除的目录。

2、清理 save 保留后缀以外的文件。

3、清理空文件夹。


<br>

## 结合工作流
项目说明文档的最佳实践是与项目代码同步，并且保持源的唯一性。该脚手架可以帮助我们实现这一点。比如，在项目代码中，在不同组件目录下有各自的说明文档。我们可以使用 Jenkins 等持续集成交付系统，在构建应用镜像的同时，
将项目代码拷贝一份到 public/md 目录下，并清理无关文件，以生成可供浏览器访问的说明文档。

<br>

## 注意问题
1、public/md 目录下目录名称和文件名不能包含点号（.）。
