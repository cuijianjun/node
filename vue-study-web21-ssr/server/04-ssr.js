// 最终的服务端渲染脚本

// node代码
// express server
const express = require('express')
const app = express()
const {createBundleRenderer} = require('vue-server-renderer')

// 获取指定文件绝对路径
const resolve = dir => require('path').resolve(__dirname, dir)

// 第 1 步：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
app.use(express.static(resolve('../dist/client'), {index: false}))

// 判断当前执行环境
const isDev = process.env.NODE_ENV === 'development'

// 获取渲染器
// 第 3 步：服务端打包文件地址
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");

let renderer

function createRenderer() {
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
    clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
  });
  return renderer;
}

// 如果当前执行环境是开发环境，则监控src目录变更
if (isDev) {
  const cp = require('child_process')
  // 创建一个bs实例用于将来浏览器的同步操作
  const bs = require('browser-sync').create()
  // 导入chokidar监控src
  const chokidar = require('chokidar')
  const watcher = chokidar.watch('src/**/*.*')
  watcher.on('change', (path) => {
    console.log(path + '发生变化，正在重新编译，请稍后。。。。');
    // 开启子进程进行构建命令
    cp.exec('npm run build', function (error,stdout) {
      if (error) {
        console.log(error.stack);
      }
      // 构建信息输出到当前控制台
      console.log(stdout);
      console.log("编辑完成，重新加载");

      // 浏览器同步
      bs.reload()
    })
  });

  // 创建一个代理
  bs.init({proxy: 'http://localhost:3000'})
}

app.get('*', async (req, res) => {

  // 构造renderer上下文
  const context = {
    title: 'ssr test',
    url: req.url // 用户请求的首屏地址
  }
  
  try {
    // 如果是开发模式或者还未存在的renderer则创建
    if (isDev || !renderer) {
      renderer = createRenderer()
    }
    // renderToString将Vue实例转换为html字符串
    const html = await renderer.renderToString(context)
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器渲染错误')
  }
  
})

app.listen(3000)