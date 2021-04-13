#!/usr/bin/env bash
npm config get registry #检查仓库镜像源
npm config set registry=http://registry.npmjs.org
echo "请进行登录相关的操作"
npm login #登录
echo "--------------publishing---------"
npm publish #发布
npm config set registry=https://registry.npm.taobao.org #设置为淘宝镜像源
echo "发布完成"
exit