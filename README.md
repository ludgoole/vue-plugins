# vue-plugins

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Compiles and widget for apicloud

```
npm run generate
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### git

#### 本地推送远程

```js
// 推送到远程分支
git push origin apicloud:apicloud
// 与远程分支建立关联
git branch --set-upstream-to=origin/apicloud apicloud
```

#### 本地拉取远程

```js
git checkout origin/apicloud --track
```

### apicloud 调试

#### 1.打包编译

```
npm run build
npm run generate
```

#### 2.删除最外层 config.xml

#### 3.widget/index.html 页面内

右键 > wifi 预览页面 (Alt + O)
