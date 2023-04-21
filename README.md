# 前端项目-命令行交互控制终端

```info

解决难题：由于内部使用lerna管理前端包，存在各个项目存在不同风格的问题，命令使用较麻烦。

用于统一管理前端项目，不需要额外查看每个项目中的运行命令，只需安装此插件，运行cmdr run <packages>即可。

该命令自动查找<packages>下的文件夹下的所有项目，自动收集项目的命令集合，并最后整合出来，供用户使用。

```

```bash

运行 `cmdr run <packages>`即可管理包的命令，实现多项目整合使用和发布

<packages> 为项目下的父目录，用来统一放置项目，可以根据需要进行更改，最后传值进来是正确的即可。

```

