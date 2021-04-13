const { promisify } = require('util');
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content));
const { clone } = require("./download")
const open = require('open')

const spawn = async (...args) => {
  // log流对接 子 ----> 主
  // 封promise风格
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)

    proc.on('close', () => {
      resolve()
    })
  })
}
module.exports = async name => {
  // 打开欢迎界面
  clear()
  const data = await figlet('KKB welcome')
  log(data)
  log("🚀创建项目：" + name)
  // clone
  // await clone("github:su37josephxia/vue-template", name);
  // npm install
  log("安装依赖")
  await spawn("npm", ["install"], { cwd: `./${name}` })
  // log(chalk.green(` 👌安装完成： 
  //     To get Start: 
  //     =========================== 
  //     cd ${name} 
  //     npm run serve 
  //     ===========================
  //   `))
  open('http://localhost:8080')
  await spawn('npm', ['run', 'serve'], {cwd: `./${name}`})
}