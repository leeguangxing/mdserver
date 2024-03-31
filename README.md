English | [简体中文](/README.zh-CN.md)

# Introduction

The scaffolding is based on koa2 to implement server-side rendering of md documents. It can help us accomplish the following tasks:  

1、Quickly create a local Web Server for md documents, and automatically synchronize to the browser after modifying the document.

2、Routers can be automatically created according to the document directory or manually configured.

3、Cooperate with CI/CD such as Jenkins to keep the project and documentation Synchronously updated.

4、The UI can support on PC or mobile.

5、Support using html tags.

![demo](https://www.leeguangxing.cn/pic/mdserver.jpg)

<br>

## Install and start

1、Install dependencies：
```bash
yarn install
```
2、Start the local Web Server：
```bash
yarn dev
```

<br>

## Auto restart

Use nodemon to restart koa2 server (port 80).

Use browser-sync to reload the browser（browser-sync UI port 3001, browser pages port 3002, browser-sync server port 3003）。

<br>

## Router Creation
The process of generating dynamic routing on koa2 is:  

1、The /lib/mapDir.js script generates objects that map the directory structure.
 
2、Then use flat.js to flatten the directory object into a routing path.
 
3、If useDirectoryNav of nav.config.json is set to true, then use json to directly create routers.

<br>

## Environment variables
The following environment variables are used in the project:

|Name|Description|Default|
|:---:|:---:|:---:|
|PORT|The listening port of koa2|80|
|NODE_ENV|When set to production, log information etc. will not be console, and will not set request to browser-sync server|undefined|

<br>

## Configuration of nav.config.json 
|Attribute|Description|Required|
|:---:|:---:|:---:|
|title|html document title|No|
|useDirectoryNav|Whether to create according to directory|Yes|
|indexLink|Home routing path|Yes|
|menus|Menu array|Necessary when useDirectoryNav is false|
|title|Menu title|Necessary when useDirectoryNav is false|
|link|Menu routing path|Necessary when useDirectoryNav is false|
|staticFile|Whether to open as a static file, if yes, add path Prefix /md/|No|

The project provides the clear-md-directory.js script to clean up irrelevant files and directories in the public/md directory. This is useful if your document and project code are in the same directory.
It will clean up according to the following configuration in nav.config.json:

|Attribute|Description|Required|
|:---:|:---:|:---:|
|save|The suffix of the file to be retained, at least .md|Yes|
|exclude|The directory path to be deleted as a whole, relative to the public/md path|No|

clear-md-directory.js will do the following:

1、Clean up the excluded directories.

2、Clean up files with unexpected suffixes.

3、Clean up empty folders.

<br>

## Work with pipeline
The best practice for project description documents is to synchronize with the project code and keep the source unique. The scaffolding can help us achieve this. 
For example, in the project code, there are separate documentation in different component directories. We can use CI/CD such as Jenkins to build application images at the same time,
Copy the project code to the public/md directory and clean up irrelevant files to generate documentation Web Server that can be accessed by the browser.

<br>

## Attention
1、The names of directories and files in the public/md directory cannot contain periods (.).

