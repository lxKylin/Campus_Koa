const chalk = require('chalk'); // 终端样式库
const inquirer = require('inquirer'); // 命令行用户交互库
const fs = require('fs');
const path = require('path');
const ejs = require('ejs'); // JavaScript模版引擎库
const changeCase = require('change-case'); // 字符串格式切换库

const fileNameReg = /^[a-z]*$/;
async function getFileName() {
  let fileName = process.argv[2]; // 获取命令行输入的参数

  if (!fileName) {
    const answers = await inquirer.prompt([{
      type: 'input',
      name: 'fileName',
      message: chalk.green('请输入要创建的文件名称(小写字母形式，如test): ')
    }]);
    if (answers.fileName) {
      fileName = answers.fileName;
    } else {
      fileName = await getFileName();
    }
  }

  if (!fileNameReg.test(fileName)) {
    fileName = await getFileName();
  }

  return fileName;
}

getFileName().then(fileName => {
  const pascalFileName = changeCase.pascalCase(fileName); // 开头字母转大写

  // 在src/controller目录下创建一个子目录，用于存放file的核心代码
  const controllerFile = path.resolve(__dirname, `../src/controller/${fileName}.controller.js`);
  // 在src/router目录下创建一个子目录，用于存放file的核心代码
  const routerFile = path.resolve(__dirname, `../src/router/${fileName}.router.js`);
  // 在src/service目录下创建一个子目录，用于存放file的核心代码
  const serviceFile = path.resolve(__dirname, `../src/service/${fileName}.service.js`);

  // 检测是否存在该文件
  const exists = fs.existsSync(controllerFile) && fs.existsSync(routerFile) && fs.existsSync(serviceFile); 

  // 拿到模版代码
  // 方式一
  // const controllerCode = fs.readFileSync(path.resolve(__dirname, "./controller-template/controller.ejs"));

  // const routerCode = fs.readFileSync(path.resolve(__dirname, "./router-template/router.ejs"));

  // const serviceCode = fs.readFileSync(path.resolve(__dirname, "./service-template/service.ejs"));

  // 方式二
  const controllerTemplate = path.resolve(__dirname, "./controller-template/controller.ejs");

  const routerTemplate = path.resolve(__dirname, "./router-template/router.ejs");

  const serviceTemplate = path.resolve(__dirname, "./service-template/service.ejs");

  if (exists) {
    console.log(`${chalk.red(`文件 ${chalk.bold(fileName)} 代码或文档已存在，请勿重复添加！`)}`);
    return;
  } else {
    /**
     * 方式一
     * ejs.render(str, data, options);
     *  => 输出渲染后的 HTML 字符串
     */
    // let controllerResult = ejs.render(controllerCode.toString(), {fileName: pascalFileName});
    // let routerResult = ejs.render(routerCode.toString(), {fileName: fileName});
    // let serviceResult = ejs.render(serviceCode.toString(), {fileName: pascalFileName});

    // fs.writeFileSync(controllerFile, controllerResult)
    // fs.writeFileSync(routerFile, routerResult)
    // fs.writeFileSync(serviceFile, serviceResult)

    /**
     * 方式二
     * ejs.renderFile(filename, data, options, function(err, str){
     *   // str => 输出渲染后的 HTML 字符串
     * });
     */
     ejs.renderFile(controllerTemplate, {
      fileName: pascalFileName
    }, null, function (_, str) {
      fs.writeFileSync(controllerFile, str);
    });

     ejs.renderFile(routerTemplate, {
      fileName: fileName
    }, null, function (_, str) {
      fs.writeFileSync(routerFile, str);
    });

     ejs.renderFile(serviceTemplate, {
      fileName: pascalFileName
    }, null, function (_, str) {
      fs.writeFileSync(serviceFile, str);
    });

  }
})
