# 前端项目-命令行交互控制终端

```info

说明：

解决难题：由于内部使用lerna管理前端包，存在各个项目存在不同风格的问题，命令使用较麻烦。

用于统一管理前端项目，不需要额外查看每个项目中的运行命令，只需安装此插件，运行cmdr run <packages>即可。

该命令自动查找<packages>下的文件夹下的所有项目，自动收集项目的命令集合，并最后整合出来，供用户使用。

```

``` bash

下载命令包自己决定即可

npm i oms-fct

```

``` bash

`cmdr run <packages>`

<packages> 为项目下的父目录，用来统一放置项目，可以根据需要进行更改，最后传值进来是正确的即可。

```

```info

运行截图

![image](https://user-images.githubusercontent.com/21993915/233593339-5a62f19e-19da-4d1b-8f3e-7f1086414098.png)

![image](https://user-images.githubusercontent.com/21993915/233593412-3e0a9e1a-93b4-47cf-a543-eb32fd4410be.png)

![image](https://user-images.githubusercontent.com/21993915/233593553-0113c217-75c5-48ef-8cd9-6d0a8f418fc6.png)
```

